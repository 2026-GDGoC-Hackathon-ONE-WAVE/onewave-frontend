import React, { useMemo, useRef, useState } from 'react';

const EMOTIONS = [
  { key: 'calm', label: '😐 담담해요' },
  { key: 'sad', label: '😞 아쉬워요' },
  { key: 'tired', label: '😮‍💨 피곤해요' },
  { key: 'angry', label: '😤 짜증나요' },
  { key: 'happy', label: '😊 괜찮아요' },
  { key: 'excited', label: '✨ 설레요' },
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
  const [selectedEmotion, setSelectedEmotion] = useState(null); 
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState(() => [
    {
      id: 'ai-1',
      role: 'ai',
      text: '안녕하세요! 회고를 시작해볼까요?\n먼저 지금 기분을 한 단어로 골라주세요.',
      time: nowTimeLabel(),
    },
  ]);

  const listRef = useRef(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isSending,
    [input, isSending],
  );

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const pushMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${role}-${Date.now()}-${Math.random()}`,
        role,
        text,
        time: nowTimeLabel(),
      },
    ]);
    queueMicrotask(scrollToBottom);
  };

  async function sendToAI(userText) {
    await new Promise((r) => setTimeout(r, 700));
    return `좋아요. "${userText}"에서 가장 기억에 남는 장면은 뭐였나요?\n(짧게 한 문장으로 적어도 괜찮아요)`;
  }

  const handleSelectEmotion = (emotion) => {
    if (selectedEmotion) return;
    setSelectedEmotion(emotion);

    pushMessage('user', emotion.label);
    pushMessage(
      'ai',
      '좋아요. 그 기분이 들게 만든 상황을 떠올려볼까요?\n오늘 가장 기억에 남는 순간을 한 문장으로 적어주세요.',
    );
  };

  const handleSend = async () => {
    if (!canSend) return;

    const userText = input.trim();
    setInput('');
    pushMessage('user', userText);

    setIsSending(true);
    try {
      const reply = await sendToAI(userText);
      pushMessage('ai', reply);
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-base font-bold text-gray-900">회고 대화</h1>
          </div>
          <div className="text-xs text-gray-500">
            {selectedEmotion
              ? `감정: ${selectedEmotion.label}`
              : '감정 선택 전'}
          </div>
        </div>
      </header>

      {/* Chat */}
      <main className="mx-auto max-w-3xl px-4">
        <div
          ref={listRef}
          className="mt-6 mb-28 flex flex-col gap-6 overflow-auto"
          style={{ maxHeight: 'calc(100vh - 64px - 120px)' }}
        >
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role} text={m.text} time={m.time} />
          ))}

          {/* Emotion buttons block */}
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
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-semibold">
                감정 선택 완료
                <span className="text-indigo-600">{selectedEmotion.label}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="mx-auto max-w-3xl px-4 pb-6 pt-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={
                selectedEmotion
                  ? '솔직한 생각을 적어보세요… (Enter 전송, Shift+Enter 줄바꿈)'
                  : '먼저 감정을 선택해주세요…'
              }
              disabled={!selectedEmotion || isSending}
              className="flex-1 resize-none rounded-xl px-3 py-2 outline-none text-sm text-gray-800 placeholder:text-gray-400 disabled:bg-gray-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!selectedEmotion || !canSend}
              className="shrink-0 h-10 px-4 rounded-xl bg-indigo-600 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
            >
              {isSending ? '전송중…' : '전송'}
            </button>
          </div>

          <p className="mt-2 text-[11px] text-gray-500">
            ※ 이 화면은 UI 데모용입니다. 실제 AI 연동은 <code>sendToAI()</code>{' '}
            함수에 fetch를 붙이면 됩니다.
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
      {/* avatar */}
      <div
        className={[
          'w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm',
          isUser
            ? 'bg-indigo-600 text-white'
            : 'bg-white border border-gray-100 text-indigo-600',
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
              ? 'bg-indigo-600 text-white rounded-tr-none'
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
