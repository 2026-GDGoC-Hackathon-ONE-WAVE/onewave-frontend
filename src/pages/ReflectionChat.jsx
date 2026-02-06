import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [sessionId] = useState(1); // UI용 더미
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const [isSending, setIsSending] = useState(false);

  const listRef = useRef(null);

  const canSend = useMemo(() => {
    return !!selectedEmotion && input.trim().length > 0 && !isSending;
  }, [selectedEmotion, input, isSending]);

  const canFinish = useMemo(() => {
    // UI만: 감정 선택만 해도 활성화되게
    return !!selectedEmotion && !isSending;
  }, [selectedEmotion, isSending]);

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
    if (selectedEmotion) return;

    setSelectedEmotion(emotion);
    // UI: User selects emotion
    pushMessage('user', emotion.label);

    // Simulate API: POST /api/chat/sessions
    // Request: { applicationId: 1, selectedEmotion: emotion.label }
    // Response: { ... data: { firstMessage: { content: "..." } } }
    setIsSending(true);
    try {
      await new Promise((r) => setTimeout(r, 600));

      // Dummy response data
      const responseData = {
        sessionId: 1,
        applicationId: 1,
        companyName: '토스',
        jobTitle: 'Product Designer',
        selectedEmotion: emotion.label,
        createdAt: new Date().toISOString(),
        firstMessage: {
          messageId: 1,
          senderType: 'AI',
          content:
            '안녕하세요! 토스 서류 전형에 대한 회고를 시작하겠습니다. 먼저, 이번 지원에서 가장 신경 쓴 부분은 무엇이었나요?',
          createdAt: new Date().toISOString(),
        },
      };

      pushMessage('ai', responseData.firstMessage.content);
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

    // Simulate API: POST /api/chat/sessions/{sessionId}/messages
    // Request: { message: userText }
    // Response: { ... data: { aiMessage: { content: "..." } } }
    setIsSending(true);
    try {
      await new Promise((r) => setTimeout(r, 600));

      // Dummy response data
      const responseData = {
        userMessage: {
          messageId: Date.now(),
          senderType: 'USER',
          content: userText,
          createdAt: new Date().toISOString(),
        },
        aiMessage: {
          messageId: Date.now() + 1,
          senderType: 'AI',
          content: '좋습니다. 구체적으로 어떤 부분을 강조하셨나요?',
          createdAt: new Date().toISOString(),
        },
      };

      pushMessage('ai', responseData.aiMessage.content);
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
            <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-arrows-rotate text-white text-sm" />
            </div>
            <span className="text-lg font-black tracking-tighter text-[#222222]">RE:TRACE</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-gray-900">회고 대화 진행 중</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Session #{sessionId}</span>
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
            onClick={() => navigate('/reflection/summary')}
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
              disabled={!selectedEmotion || isSending}
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

          <p className="text-[11px] text-gray-500">
            * 현재는 UI 데모입니다. (API 연동 없이 화면 흐름만 확인)
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ role, text, time }) {
  const isUser = role === 'user';
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
          {text}
        </div>
        <span className="text-[11px] text-gray-400">{time}</span>
      </div>
    </div>
  );
}
