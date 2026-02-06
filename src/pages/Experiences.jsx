import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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
  const [experienceList, setExperienceList] = useState([]);

  // 2. useEffect에서 데이터 fetch
  React.useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // userId는 현재 1로 고정하여 테스트
        const response = await axios.get(`https://spring-app-343780568798.asia-northeast3.run.app/api/applications?userId=1`);
        if (response.data.success) {
          // 백엔드 필드명(companyName 등)을 프론트엔드 props명(company 등)에 맞게 매핑하여 저장
          const mappedData = response.data.data.applications.map(app => ({
            id: app.applicationId,
            company: app.companyName,
            tag: app.jobTitle,
            date: app.interviewDate.replace(/-/g, '.'), // YYYY-MM-DD -> YYYY.MM.DD
            status: app.failedStage,
            step: app.failedStage, // 상세 단계 정보가 필요하면 추가 매핑
            progress: app.reflectionStatus === '완료' ? '회고 완료' : '회고 전',
            imgUrl: 'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-d7b8662c-63fe-458a-bdfd-57de8cf7580f.jpg' // 기본 이미지
          }));
          setExperienceList(mappedData);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchExperiences();
  }, []);

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
  const handleAddExperience = async () => {
    if (!newExp.company || !newExp.tag) {
      alert('회사명과 직무를 입력해주세요!');
      return;
    }

    const requestBody = {
      userId: 1, // 테스트용
      companyName: newExp.company,
      jobTitle: newExp.tag,
      interviewDate: newExp.date || "2025-02-07",
      failedStage: newExp.step,
      simpleMemo: newExp.simpleMemo,
      stages: [{ stageName: newExp.step, stageOrder: 1 }] // 기본 단계 설정
    };

    try {
      const response = await axios.post(
        'https://spring-app-343780568798.asia-northeast3.run.app/api/applications',
        requestBody
      );

      if (response.data.success) {
        // 등록 성공 시 페이지 새로고침 없이 리스트에 추가하거나 다시 fetch
        alert('등록되었습니다!');
        window.location.reload(); // 가장 간단한 방법
      }
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  // 상세 모달 열기
  const openDetailModal = async (exp) => {
  try {
    // 1. 지원 내역 상세 조회 (기본 정보 및 회고 완료 여부 확인)
    const detailRes = await axios.get(
      `https://spring-app-343780568798.asia-northeast3.run.app/api/applications/${exp.id}`
    );
    
    if (detailRes.data.success) {
      let finalData = {
        ...exp,
        ...detailRes.data.data,
        company: detailRes.data.data.companyName,
        tag: detailRes.data.data.jobTitle
      };

      // 2. 만약 회고 상태가 '완료'라면, 회고 내용 상세 조회 API를 추가로 호출
      if (detailRes.data.data.reflectionStatus === '완료') {
        try {
          // 실제 서비스에서는 applicationId를 기반으로 reflectionId를 찾거나 매핑해야 합니다.
          // 여기서는 명세에 따라 특정 reflectionId(예: 1)를 호출한다고 가정합니다.
          const reflectionRes = await axios.get(
            `https://spring-app-343780568798.asia-northeast3.run.app/api/reflections/1` 
          );

          if (reflectionRes.data.success) {
            const refData = reflectionRes.data.data;
            // 회고 데이터를 기존 데이터에 병합
            finalData = {
              ...finalData,
              summary: refData.userSummary,      // 회고 요약
              nextAction: refData.userImprovement, // Action Item
              keywords: refData.keywords        // 키워드 리스트
                .filter(k => k.isSelected)      // 선택된 것만 필터링
                .map(k => k.keyword)
            };
          }
        } catch (error) {
          console.error("회고 상세 데이터 로드 실패", error);
        }
      }

      setSelectedExp(finalData);
    }
  } catch (error) {
    console.error("상세 정보 로드 실패:", error);
    setSelectedExp(exp);
  }
};

  // 상세 모달 닫기
  const closeDetailModal = () => {
    setSelectedExp(null);
  };

  // 더미 회고 데이터 (회고 완료 시에만 사용)
  const emotionMap = {
    "기쁨": "😊",
    "당황": "😳",
    "슬픔": "😢",
    "평온": "😌",
    "만족": "✨"
  };

// JSX에서 사용할 때:
// {emotionMap[selectedExp.selectedEmotion] || '🤔'}

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
                        {/* 매핑 객체를 사용하여 이모지 출력 */}
                        <div className="text-4xl">
                          {emotionMap[selectedExp.selectedEmotion] || '😌'}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {selectedExp.selectedEmotion}
                          </p>
                          <p className="text-xs text-gray-500">
                            백엔드에서 온 감정 데이터입니다.
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
                        {/* isSelected가 true인 것만 골라서 배지로 출력 */}
                        {selectedExp.keywords?.filter(k => k.isSelected).map((kw) => (
                          <span
                            key={kw.keywordId}
                            className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[13px] font-bold text-gray-600 shadow-sm"
                          >
                            #{kw.keyword}
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
                          {selectedExp.userSummary} {/* summary 대신 userSummary */}
                        </p>
                      </div>
                    </section>

                    {/* 5. Action Item (다크 모드 디자인 유지) */}
                    <section>
                      <label className="block text-[13px] font-bold text-orange-600 uppercase tracking-widest mb-3">
                        Action Item
                      </label>
                      <div className="bg-[#111827] p-5 rounded-[22px] flex items-start gap-4 shadow-lg shadow-orange-100">
                        <div className="w-10 h-10 bg-[#D9F99D] rounded-xl flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faBolt} className="text-[#111827]" />
                        </div>
                        <p className="text-white text-[15px] font-medium leading-snug">
                          {selectedExp.userImprovement} {/* nextAction 대신 userImprovement */}
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
                      <label
                        className={`block text-[11px] font-bold mb-0.5 ${selectedExp.progress === '회고 완료' ? 'text-indigo-600' : 'text-orange-600'}`}
                      >
                        상태
                      </label>
                      <span className="text-xl font-black text-gray-900">
                        {selectedExp.progress}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/reflection')}
                    className={`px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl text-white ${
                      selectedExp.progress === '회고 완료'
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-200/50'
                        : 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-200/50'
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
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg text-white ${
            progress === '회고 완료'
              ? 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-200/50'
              : isStart
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-200/50'
                : 'bg-gradient-to-r from-orange-400 to-amber-500 shadow-orange-200/50'
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
