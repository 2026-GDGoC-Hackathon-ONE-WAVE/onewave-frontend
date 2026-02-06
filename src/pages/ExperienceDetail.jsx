import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faBell,
  faChevronRight,
  faBriefcase,
  faCircleCheck,
  faRotateLeft,
  faPenToSquare,
  faTrashCan,
  faShareNodes,
  faPlus,
  faQuoteLeft,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

const ExperienceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expData = location.state;

  const displayData = {
    company: expData?.company || '구글 코리아(Google)',
    tag: expData?.tag || 'Software Engineer',
    date: expData?.date || '2025.12',
    step: expData?.step || '기술 인터뷰',
    simpleMemo:
      expData?.simpleMemo || '면접 분위기가 매우 유연하고 수평적이었음.',
    progress: expData?.progress || '회고 완료',
  };

  // '회고 완료'일 때만 보여줄 추가 데이터 (나중에 백엔드에서 받아올 값들)
  const reportData = {
    emotion: {
      emoji: '😌',
      label: '평온함',
      desc: '마음이 차분하고 안정된 상태',
    },
    keywords: ['#성장', '#몰입', '#작은성취', '#데이터분석'],
    summary:
      '오늘은 복잡했던 로직을 깔끔하게 정리하며 성취감을 느꼈습니다. 조금 느리더라도 방향이 맞다면 괜찮다는 것을 깨달은 하루였습니다.',
    nextAction: '작업 중간에 15분씩은 꼭 화면에서 눈을 떼고 명상하기',
  };

  return (
    <div className="ui-screen bg-[#F9FAFB] min-h-screen">
      <div
        id="app"
        className="relative w-full flex flex-col items-center font-sans text-[#1A1A1A]"
      >
        {/* --- Main Content --- */}
        <main className="px-10 py-10 flex flex-col items-center w-full">
          <div className="w-full max-w-[540px] mb-5 flex items-center gap-2 text-[13px] font-medium text-gray-400">
            <span
              className="cursor-pointer hover:text-gray-600"
              onClick={() => navigate('/experiences')}
            >
              나의 경험
            </span>
            <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
            <span className="text-gray-900 font-bold">상세 보기</span>
          </div>

          {/* Experience Detail Card (540px 비율 유지) */}
          <div className="w-full max-w-[540px] bg-white rounded-[28px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] border border-gray-100 p-9 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-[#FB923C]/5 to-transparent rounded-full -mr-12 -mt-12 blur-3xl"></div>

            {/* 기존 상단 정보 (회사, 직무, 날짜) */}
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[13px] font-bold mb-3">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-1.5" />
                  채용 프로세스
                </div>
                <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
                  {displayData.company}
                  <br />
                  <span className="text-gray-400 font-medium text-xl">
                    {displayData.tag}
                  </span>
                </h1>
              </div>
              <div className="text-right text-sm">
                <span className="text-gray-400 font-semibold mb-1 block uppercase tracking-wider">
                  {displayData.date}
                </span>
                <div className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold">
                  {displayData.step}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 mb-8"></div>

            {/* 데이터 섹션들 (세로 배치) */}
            <div className="space-y-8 relative z-10">
              {/* 1. 간단 메모 (공통) */}
              <section>
                <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  간단 메모
                </label>
                <div className="p-6 bg-gray-50 rounded-[22px] border border-gray-100">
                  <p className="text-[16px] text-gray-700 leading-relaxed font-medium">
                    "{displayData.simpleMemo}"
                  </p>
                </div>
              </section>

              {/* --- 회고 완료 시에만 나타나는 세로 요소들 --- */}
              {displayData.progress === '회고 완료' && (
                <>
                  {/* 2. 선택한 감정 */}
                  <section>
                    <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
                      오늘의 감정
                    </label>
                    <div className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-[22px] border border-orange-100/50">
                      <div className="text-4xl">{reportData.emotion.emoji}</div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {reportData.emotion.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reportData.emotion.desc}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 3. 오늘의 키워드 */}
                  <section>
                    <label className="block text-[13px] font-bold ttext-orange-600 uppercase tracking-widest mb-3">
                      키워드
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {reportData.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[13px] font-bold text-gray-600 shadow-sm"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* 4. 회고 요약 */}
                  <section>
                    <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
                      회고 요약
                    </label>
                    <div className="relative pl-6 py-2">
                      <p className="text-[17px] font-medium text-gray-800 leading-relaxed">
                        {reportData.summary}
                      </p>
                    </div>
                  </section>

                  {/* 5. 다음에 바꿀 한 가지 */}
                  <section>
                    <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
                      Action Item
                    </label>
                    <div className="bg-[#111827] p-5 rounded-[22px] flex items-start gap-4 shadow-lg shadow-orange-100">
                      <div className="w-10 h-10 bg-[#D9F99D] rounded-xl flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faBolt}
                          className="text-[#111827]"
                        />
                      </div>
                      <p className="text-white text-[15px] font-medium leading-snug">
                        {reportData.nextAction}
                      </p>
                    </div>
                  </section>
                </>
              )}

              {/* 회고 상태 표시 배지 */}
              <div
                className={`flex items-center justify-between p-6 bg-gradient-to-r ${displayData.progress === '회고 완료' ? 'from-[#FB923C]/5 to-[#FDBA74]/5' : 'from-[#FDBA74]/5 to-[#FB923C]/5'} rounded-[22px] border border-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                    {displayData.progress === '회고 완료' ? '✨' : '❓'}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-orange-600 mb-0.5">
                      상태
                    </label>
                    <span className="text-xl font-black text-gray-900">
                      {displayData.progress}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/reflection-chat')}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm"
                >
                  {displayData.progress === '회고 완료'
                    ? '다시 회고하기'
                    : '회고 시작하기'}
                </button>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="mt-8 flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors">
              <FontAwesomeIcon icon={faPenToSquare} /> 정보 수정
            </button>
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            <button className="flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-red-500 transition-colors">
              <FontAwesomeIcon icon={faTrashCan} /> 삭제하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExperienceDetail;
