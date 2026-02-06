import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  startChatSession,
  sendChatMessage,
  createReflection,
} from '../api/endpoints';

const EMOTIONS = [
  { key: 'confused', label: '😵‍💫 당황' },
  { key: 'sad', label: '😞 아쉬움' },
  { key: 'tired', label: '😮‍💨 피곤' },
  { key: 'calm', label: '😐 담담' },
  { key: 'angry', label: '😤 답답' },
  { key: 'hope', label: '✨ 그래도 해볼만' },
];

function nowTimeLabel() {
  const d = new Date();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? '오후' : '오전';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${hh}:${m}`;
}

export default function ReflectionChat() {
  const navigate = useNavigate();
  const location = useLocation();
  // applicationId defaulting to 1 if not provided (mock)
  const applicationId = location.state?.applicationId || 1;

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [isSending, setIsSending] = useState(false);

  const listRef = useRef(null);

  const canSend = useMemo(() => {
    return (
      !!selectedEmotion && input.trim().length > 0 && !isSending && !!sessionId
    );
  }, [selectedEmotion, input, isSending, sessionId]);

  const canFinish = useMemo(() => {
    // UI만: 감정 선택만 해도 활성화되게, but ideally needs at least some chat
    return !!selectedEmotion && !isSending && !!sessionId;
  }, [selectedEmotion, isSending, sessionId]);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const pushMessage = (role, text, time) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${Math.random()}`,
        role,
        text,
        time: time || nowTimeLabel(),
      },
    ]);
    queueMicrotask(scrollToBottom);
  };

  const handleSelectEmotion = async (emotion) => {
    if (selectedEmotion || isSending) return;

    setSelectedEmotion(emotion);
    // UI: User selects emotion
    pushMessage('user', emotion.label);
    setIsSending(true);

    try {
      const res = await startChatSession(applicationId, emotion.label);
      if (res.success) {
        setSessionId(res.data.sessionId);
        pushMessage('ai', res.data.firstMessage.content);
      } else {
        alert('세션 시작 실패: ' + res.message);
        setSelectedEmotion(null); // Reset on failure
      }
    } catch (e) {
      console.error(e);
      alert('세션 시작 중 오류가 발생했습니다.');
      setSelectedEmotion(null);
    } finally {
      setIsSending(false);
    }
  };

  const sendMessage = async () => {
    if (!canSend) return;

    const userText = input.trim();
    setInput('');

    // UI: User message
    pushMessage('user', userText);
    setIsSending(true);

    try {
      const res = await sendChatMessage(sessionId, userText);
      if (res.success) {
        pushMessage('ai', res.data.aiMessage.content);
      } else {
        // Retry logic or error message could be added here
        pushMessage('ai', '메시지 전송 실패: ' + res.message);
      }
    } catch (e) {
      console.error(e);
      pushMessage('ai', '오류가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  const handleFinish = async () => {
    if (!canFinish) return;

    if (!window.confirm('회고를 마치시겠습니까?')) return;

    setIsSending(true);
    try {
      // Placeholder data as per discussion (Frontend generated / or default)
      // Since UI doesn't have inputs for these, we send defaults.
      // In a real app, AI might generate these or user inputs them in a final step.
      const payload = {
        sessionId,
        applicationId,
        aiGeneratedKeywords: ['회고', '성장', '도전'], // Mock/Default
        userSummary: '회고를 완료했습니다. (자동 생성)',
        userImprovement: '꾸준히 기록하기 (자동 생성)',
      };

      const res = await createReflection(payload);
      if (res.success) {
        navigate(`/reflection/summary/${res.data.reflectionId}`);
      } else {
        alert('회고 저장 실패: ' + res.message);
      }
    } catch (e) {
      console.error(e);
      alert('회고 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (window.confirm('회고를 중단하고 홈으로 이동할까요?')) {
                navigate('/');
              }
            }}
          >
            <span className="text-2xl font-black tracking-tighter text-[#222222]">
              RE:TRACE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-gray-900">
                회고 대화 진행 중
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat */}
      <main className="mx-auto max-w-3xl px-4">
        <div
          ref={listRef}
          className="mt-6 mb-36 flex flex-col gap-6 overflow-auto"
          style={{ maxHeight: 'calc(100vh - 64px - 160px)' }}
        >
          {/* 첫 안내 메시지 */}
          {messages.length === 0 && (
            <ChatBubble
              role="ai"
              text="안녕하세요! 회고를 시작해볼까요?\n먼저 지금 기분을 골라주세요."
              time={nowTimeLabel()}
            />
          )}

          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} text={m.text} time={m.time} />
          ))}

          {/* Emotion buttons */}
          {!selectedEmotion && (
            <div className="ml-12 flex flex-wrap gap-2">
              {EMOTIONS.map((e) => (
                <button
                  key={e.key}
                  type="button"
                  onClick={() => handleSelectEmotion(e)}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                  disabled={isSending}
                >
                  {e.label}
                </button>
              ))}
            </div>
          )}

          {selectedEmotion && (
            <div className="ml-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1 text-xs font-semibold">
                감정 선택 완료{' '}
                <span className="text-orange-600">{selectedEmotion.label}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="mx-auto max-w-3xl px-4 pb-6 pt-3 space-y-2">
          {/* Finish button (UI only) */}
          <button
            type="button"
            disabled={!canFinish}
            onClick={handleFinish}
            className="w-full h-11 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            회고 마치고 요약 보기
          </button>

          {/* Input */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={
                selectedEmotion
                  ? '답변을 입력하세요… (Enter 전송, Shift+Enter 줄바꿈)'
                  : '먼저 감정을 선택하세요…'
              }
              disabled={!selectedEmotion || isSending || !sessionId}
              className="flex-1 resize-none rounded-xl px-3 py-2 outline-none text-sm text-gray-800 placeholder:text-gray-400 disabled:bg-gray-50"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!canSend}
              className="shrink-0 h-10 px-4 rounded-xl bg-gradient-to-r from-[#FB923C] to-[#FDBA74] text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:from-[#EA580C] hover:to-[#FB923C] transition"
            >
              {isSending ? '전송중…' : '전송'}
            </button>
          </div>

          <p className="text-[11px] text-gray-500">* API가 연동되었습니다.</p>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ role, text, time }) {
  const isUser = role === 'user';

  // ✅ 핵심: "\\n"을 실제 줄바꿈 "\n"으로 바꿔줌
  const normalizedText =
    typeof text === 'string' ? text.replace(/\\n/g, '\n') : text;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={[
          'w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm',
          isUser
            ? 'bg-gradient-to-r from-[#FB923C] to-[#FDBA74] text-white'
            : 'bg-white border border-gray-100 text-orange-600',
        ].join(' ')}
        aria-hidden="true"
      >
        {isUser ? '나' : 'AI'}
      </div>

      <div
        className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
      >
        <div
          className={[
            'px-4 py-3 rounded-2xl max-w-[520px] whitespace-pre-line text-sm leading-relaxed',
            isUser
              ? 'bg-gradient-to-r from-[#FB923C] to-[#FDBA74] text-white rounded-tr-none'
              : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none',
          ].join(' ')}
        >
          {normalizedText}
        </div>
        <span className="text-[11px] text-gray-400">{time}</span>
      </div>
    </div>
  );
}
