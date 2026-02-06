import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReflectionSummary() {
  const navigate = useNavigate();

  const emotion = {
    emoji: '😵‍💫',
    label: '당황',
    desc: '예상 밖의 상황에 놀란 상태',
  };

  const keywords = ['성장', '몰입', '커뮤니케이션', '정리', '회고'];

  const summary =
    '오늘은 질문의 의도를 한 번에 파악하지 못해 답변이 길어졌습니다.\n하지만 경험을 다시 정리하면서 어떤 부분을 개선해야 할지 명확해졌습니다.';

  const nextAction = '답변을 ‘상황-행동-결과’ 구조로 30초 버전부터 연습하기';

  const memo =
    '면접 후 바로 정리하지 않아서 기억이 흐릿해졌다.\n다음부터는 면접 끝나고 10분 안에 메모부터 남기자.\n질문 의도를 먼저 말로 정리하는 연습도 필요.';

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="h-20 px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-sparkles text-white text-xl" />
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            RE:MIND
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="닫기"
        >
          <i className="fa-solid fa-xmark text-xl" />
        </button>
      </header>

      {/* Main */}
      <main className="px-6 py-12">
        <div className="mx-auto max-w-[1100px]">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-3xl mb-4">
              <i className="fa-solid fa-check-double text-indigo-600 text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-gray-900">
              오늘의 회고가 완료되었습니다
            </h1>
            <p className="text-gray-500 mt-2">
              기록을 바탕으로 핵심만 정리했어요.
            </p>
          </div>

          {/* Summary Card */}
          <section className="bg-white rounded-[36px] shadow-xl shadow-indigo-100/40 border border-gray-100 p-10 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-bl from-indigo-50 to-transparent rounded-full opacity-70" />

            <div className="grid grid-cols-12 gap-10 relative z-10">
              {/* Left */}
              <div className="col-span-5 flex flex-col gap-8">
                {/* Emotion */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
                    선택한 감정
                  </h3>
                  <div className="flex items-center gap-4 bg-indigo-50/60 p-6 rounded-3xl border border-indigo-100/60">
                    <div className="text-5xl">{emotion.emoji}</div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        {emotion.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {emotion.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
                    오늘의 키워드
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((k, idx) => {
                      const highlight = idx === 2;
                      return (
                        <span
                          key={k}
                          className={
                            highlight
                              ? 'px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-md shadow-indigo-200'
                              : 'px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 shadow-sm'
                          }
                        >
                          #{k}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="col-span-7 flex flex-col gap-8">
                {/* Summary */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
                    회고 요약
                  </h3>
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7 relative">
                    <i className="fa-solid fa-quote-left text-gray-200 text-3xl absolute -top-3 -left-3" />
                    <p className="text-lg font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                      {summary}
                    </p>
                  </div>
                </div>

                {/* Next Action */}
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
                    다음에 바꿀 한 가지
                  </h3>
                  <div className="bg-[#111827] p-7 rounded-3xl flex items-start gap-4 shadow-xl">
                    <div className="w-11 h-11 bg-[#D9F99D] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-bolt text-[#111827]" />
                    </div>
                    <p className="text-white text-lg font-semibold leading-snug whitespace-pre-line">
                      {nextAction}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
                    메모
                  </h3>

                  <div className="bg-indigo-50/40 border border-indigo-100/60 rounded-3xl p-7 shadow-sm">
                    <p className="text-[15px] font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                      {memo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-share-nodes" />
                  결과 공유하기
                </button>

                <button
                  type="button"
                  className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-download" />
                  이미지로 저장
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-7 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
