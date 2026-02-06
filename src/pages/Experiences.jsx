import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlus,
  faXmark,
  faHouseChimney,
  faLayerGroup,
  faChartPie,
  faUser,
  faChevronDown,
  faBriefcase,
  faBolt,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const Experiences = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  // 모달 오픈 시 배경 스크롤 방지
  React.useEffect(() => {
    if (isModalOpen || selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, selectedExp]);

  // 1. 기업 리스트 상태 관리 (토스, 당근, 구글 3종 데이터 탑재)
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      company: '토스 (비바리퍼블리카)',
      date: '2025.02.14',
      tag: 'Product Designer',
      status: '최종 탈락',
      step: '최종 임원 면접',
      progress: '회고 중',
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-d7b8662c-63fe-458a-bdfd-57de8cf7580f.jpg',
      simpleMemo:
        '면접 분위기가 매우 유연하고 수평적이었음. 사용자 데이터 기반의 의사결정 과정을 깊게 물어보셨음.',
    },
    {
      id: 2,
      company: '당근 (당근마켓)',
      date: '2025.01.28',
      tag: 'UX Researcher',
      status: '1차 탈락',
      step: '직무 역량 인터뷰',
      progress: '회고 전',
      isStart: true,
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-3a9fbdb2-4f0b-4eab-81c5-57234478e64e.jpg',
      simpleMemo: '성능 최적화와 컴포넌트 재사용성에 대한 질문이 핵심이었음.',
    },
    {
      id: 3,
      company: '구글 코리아(Google)',
      date: '2025.12.01',
      tag: 'Software Engineer',
      status: '최종 합격',
      step: '기술 인터뷰',
      progress: '회고 완료',
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-2eea60f6-d195-4d92-94f6-767fca02f7b1.jpg',
      simpleMemo:
        '자료구조와 알고리즘 위주의 질문이 많았음. 특히 대규모 트래픽 처리 경험에 대해 깊게 논의했는데, 논리적으로 설명하여 긍정적인 반응을 얻음.',
    },
  ]);

  // 2. 새 경험 입력 폼 상태 관리
  const [newExp, setNewExp] = useState({
    company: '',
    date: '',
    tag: '',
    step: '서류 전형',
    simpleMemo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExp((prev) => ({ ...prev, [name]: value }));
  };

  // 3. 새로운 경험 추가 함수
  const handleAddExperience = () => {
    if (!newExp.company || !newExp.tag) {
      alert('회사명과 직무를 입력해주세요!');
      return;
    }

    const nextId = Date.now();
    const addedExp = {
      id: nextId,
      company: newExp.company,
      date: newExp.date || '2025.02.07',
      tag: newExp.tag,
      status: '서류 탈락',
      step: newExp.step,
      progress: '회고 전',
      isStart: true,
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-2eea60f6-d195-4d92-94f6-767fca02f7b1.jpg',
      simpleMemo: newExp.simpleMemo,
    };

    setExperienceList([addedExp, ...experienceList]);
    setIsModalOpen(false);
    setNewExp({
      company: '',
      date: '',
      tag: '',
      step: '서류 전형',
      simpleMemo: '',
    });
  };

  // 상세 모달 열기
  const openDetailModal = (exp) => {
    setSelectedExp(exp);
  };

  // 상세 모달 닫기
  const closeDetailModal = () => {
    setSelectedExp(null);
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
    <div className="ui-screen bg-[#F8F9FD]">
      <div
        id="app"
        className="relative w-full min-h-screen font-['Pretendard'] overflow-x-hidden pb-32"
      >
        <main className="w-full max-w-[1200px] mx-auto px-6 py-12">
          {/* --- Hero CTA Section --- */}
          <section className="relative w-full h-[240px] bg-gradient-to-br from-[#1C1917] to-[#7C2D12] rounded-[32px] mb-12 overflow-hidden flex items-center justify-between px-16 shadow-2xl shadow-orange-900/10">
            <div className="relative z-10 text-left">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                아직 정리되지 않은
                <br />
                <span className="text-[#FB923C]">
                  {
                    experienceList.filter((e) => e.progress !== '회고 완료')
                      .length
                  }
                  개의 경험
                </span>
                이 기다리고 있어요.
              </h1>
              <button className="group flex items-center gap-3 bg-[#F97316] hover:bg-[#FB923C] text-white px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20">
                최근 경험 돌아보기
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
            <div className="relative w-[300px] h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent blur-3xl"></div>
              <img
                className="relative z-10 w-[280px] h-[280px] object-contain drop-shadow-2xl"
                src="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-6b969030-2be0-4d32-adb4-4d4231b71363.jpg"
                alt="Illustration"
              />
            </div>
          </section>

          {/* --- Experience Grid --- */}
          <div className="grid grid-cols-3 gap-8">
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-white border-2 border-dashed border-gray-200 rounded-[28px] p-8 flex flex-col items-center justify-center gap-6 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer min-h-[420px]"
            >
              <div className="w-20 h-20 bg-gray-50 group-hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl text-gray-400 group-hover:text-orange-600"
                />
              </div>
              <div className="text-center text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  새로운 경험 추가하기
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  잊기 전에 당신의 소중한
                  <br />
                  성장 기록을 남겨보세요.
                </p>
              </div>
            </div>

            {experienceList.map((exp) => (
              <ExperienceCard
                key={exp.id}
                {...exp}
                onClick={() => openDetailModal(exp)}
              />
            ))}
          </div>
        </main>

        {/* --- 새 경험 추가 모달 --- */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <div className="bg-white w-full max-w-[540px] rounded-[32px] p-9 pt-16 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh] relative scrollbar-hide">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-20"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900">
                  새 경험 추가
                </h2>
              </div>

              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    회사/조직명
                  </label>
                  <input
                    name="company"
                    value={newExp.company}
                    onChange={handleChange}
                    type="text"
                    placeholder="예: 토스"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      면접 본 날짜
                    </label>
                    <input
                      name="date"
                      value={newExp.date}
                      onChange={handleChange}
                      type="text"
                      placeholder="2025-02-01"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      지원 직무
                    </label>
                    <input
                      name="tag"
                      value={newExp.tag}
                      onChange={handleChange}
                      type="text"
                      placeholder="예: Product Designer"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    탈락한 전형
                  </label>
                  <div className="relative">
                    <select
                      name="step"
                      value={newExp.step}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium appearance-none cursor-pointer"
                    >
                      <option>서류 전형</option>
                      <option>과제/코딩 테스트</option>
                      <option>1차 면접</option>
                      <option>2차 면접</option>
                      <option>최종 면접</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    간단 메모
                  </label>
                  <textarea
                    name="simpleMemo"
                    value={newExp.simpleMemo}
                    onChange={handleChange}
                    rows="3"
                    placeholder="면접 당시 느꼈던 점이나 특징을 간단히 적어주세요."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all mt-4 shadow-xl active:scale-[0.98]"
                >
                  경험 저장하고 시작하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 경험 상세 모달 --- */}
        {selectedExp && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeDetailModal();
            }}
          >
            <div className="bg-white w-full max-w-[540px] rounded-[32px] p-9 pt-16 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh] relative scrollbar-hide">
              <button
                onClick={closeDetailModal}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-20"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>

              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-[#FB923C]/5 to-transparent rounded-full -mr-12 -mt-12 blur-3xl pointer-events-none"></div>

              {/* 상단 정보 (회사, 직무, 날짜) */}
              <div className="relative z-10 flex justify-between items-start mb-8 pr-8">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[13px] font-bold mb-3">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-1.5" />
                    채용 프로세스
                  </div>
                  <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
                    {selectedExp.company}
                    <br />
                    <span className="text-gray-400 font-medium text-xl">
                      {selectedExp.tag}
                    </span>
                  </h1>
                </div>
                <div className="text-right text-sm">
                  <span className="text-gray-400 font-semibold mb-1 block uppercase tracking-wider">
                    {selectedExp.date}
                  </span>
                  <div className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold">
                    {selectedExp.step}
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gray-100 mb-8"></div>

              {/* 데이터 섹션들 (세로 배치) */}
              <div className="space-y-8 relative z-10 text-left">
                {/* 1. 간단 메모 (공통) */}
                <section>
                  <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    간단 메모
                  </label>
                  <div className="p-6 bg-gray-50 rounded-[22px] border border-gray-100">
                    <p className="text-[16px] text-gray-700 leading-relaxed font-medium">
                      "{selectedExp.simpleMemo}"
                    </p>
                  </div>
                </section>

                {/* --- 회고 완료 시에만 나타나는 세로 요소들 --- */}
                {selectedExp.progress === '회고 완료' && (
                  <>
                    {/* 2. 선택한 감정 */}
                    <section>
                      <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
                        오늘의 감정
                      </label>
                      <div className="flex items-center gap-4 bg-orange-50/50 p-5 rounded-[22px] border border-orange-100/50">
                        <div className="text-4xl">
                          {reportData.emotion.emoji}
                        </div>
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
                      <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
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
                  className={`flex items-center justify-between p-6 bg-gradient-to-r ${selectedExp.progress === '회고 완료' ? 'from-[#6366F1]/5 to-[#8B5CF6]/5' : 'from-[#FDBA74]/5 to-[#FB923C]/5'} rounded-[22px] border border-white`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">
                      {selectedExp.progress === '회고 완료' ? '✨' : '⏳'}
                    </div>
                    <div>
                      <label className={`block text-[11px] font-bold mb-0.5 ${selectedExp.progress === '회고 완료' ? 'text-indigo-600' : 'text-orange-600'}`}>
                        상태
                      </label>
                      <span className="text-xl font-black text-gray-900">
                        {selectedExp.progress}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/reflection')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                      selectedExp.progress === '회고 완료'
                        ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
                        : 'bg-orange-500 text-white shadow-orange-200 hover:bg-orange-600'
                    }`}
                  >
                    {selectedExp.progress === '회고 완료'
                      ? '다시 회고하기'
                      : '회고 시작하기'}
                  </button>
                </div>

                {/* 하단 버튼 */}
                <div className="mt-8 flex items-center gap-6 justify-center">
                  <button className="flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faPenToSquare} /> 정보 수정
                  </button>
                  <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                  <button className="flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-red-500 transition-colors">
                    <FontAwesomeIcon icon={faTrashCan} /> 삭제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 하단 네비게이션 --- */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-100 px-8 py-4 rounded-full shadow-2xl flex items-center gap-10 z-40">
          <NavBtn icon={faHouseChimney} label="홈" active />
          <NavBtn icon={faLayerGroup} label="경험함" />
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg -mt-2 hover:scale-110 transition-transform cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </div>
          <NavBtn icon={faChartPie} label="통계" />
          <NavBtn icon={faUser} label="마이" />
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({
  company,
  date,
  tag,
  status,
  step,
  progress,
  imgUrl,
  isStart,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[420px] cursor-pointer text-left"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
              <img src={imgUrl} className="w-8 h-8 object-contain" alt="Logo" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-black text-gray-900 truncate leading-tight">
                {company}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-1">{date}</p>
            </div>
          </div>
          <div
            className={`mt-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap shrink-0 ${status.includes('최종') ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
          >
            {status}
          </div>
        </div>
        <div className="space-y-4">
          <span className="inline-block px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-sm font-bold">
            {tag}
          </span>
          <div className="p-4 bg-gray-50 rounded-2xl mt-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">
              탈락 전형
            </p>
            <p className="text-gray-900 font-bold">{step}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${progress === '회고 완료' ? 'bg-indigo-500' : progress === '회고 중' ? 'bg-orange-400 animate-pulse' : 'bg-gray-300'}`}
          ></div>
          <span className="text-sm font-bold text-gray-700">{progress}</span>
        </div>
        <button
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
            progress === '회고 완료'
              ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
              : isStart
                ? 'bg-orange-500 text-white shadow-orange-100 hover:bg-orange-600'
                : 'bg-slate-900 text-white shadow-slate-100 hover:bg-black'
          }`}
        >
          {progress === '회고 완료'
            ? '결과 보기'
            : isStart
              ? '회고 시작'
              : '이어하기'}
        </button>
      </div>
    </div>
  );
};

const NavBtn = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1 ${active ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'} transition-colors text-left`}
  >
    <FontAwesomeIcon icon={icon} className="text-xl" />
    <span className="text-[10px] font-black">{label}</span>
  </button>
);

export default Experiences;
