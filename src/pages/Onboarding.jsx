import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowsRotate, faCode, faPenNib, faChartLine, faBullhorn, 
  faCheck, faArrowRight, faCircleQuestion, faCircle 
} from '@fortawesome/free-solid-svg-icons';

const Onboarding = () => {
  const navigate = useNavigate();

  // 1. 모든 선택 정보를 담을 상태(State)
  const [formData, setFormData] = useState({
    jobCategory: '개발', // 기본값
    careerStage: '주니어 (1~3년)', // 기본값
    preparationMethod: ['포트폴리오 정리', '경험 기술서 작성'] // 기본값 배열
  });

  // 직군 및 경력 단계 선택 핸들러 (단일 선택)
  const handleSingleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 준비 방식 선택 핸들러 (복수 선택 배열 로직)
  const handleMultiSelect = (value) => {
    setFormData(prev => {
      const { preparationMethod } = prev;
      if (preparationMethod.includes(value)) {
        // 이미 있으면 제거
        return { ...prev, preparationMethod: preparationMethod.filter(item => item !== value) };
      } else {
        // 없으면 추가
        return { ...prev, preparationMethod: [...preparationMethod, value] };
      }
    });
  };

  return (
    <div className="ui-screen bg-[#F8FAFC]">
      <div id="app" className="relative w-full min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full h-20 bg-white/80 backdrop-blur-md px-12 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowsRotate} className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#222222]">RE:TRACE</span>
          </div>
          <span className="text-sm font-medium text-slate-400">Step 01/01</span>
        </header>

        <main className="relative z-10 w-full max-w-[840px] mx-auto pt-20 pb-32">
          <section className="mb-16 text-center">
            <h1 className="text-[42px] font-black text-slate-900 leading-tight mb-4">
              나만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">커리어 서사</span>를<br/>시작해볼까요?
            </h1>
          </section>

          <div className="space-y-12">
            {/* 1. 직군 선택 (단일) */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6">1. 희망하는 직군을 선택해주세요</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: '개발', icon: faCode },
                  { label: '디자인', icon: faPenNib },
                  { label: '기획/PM', icon: faChartLine },
                  { label: '마케팅', icon: faBullhorn }
                ].map(item => (
                  <JobButton 
                    key={item.label}
                    icon={item.icon} 
                    label={item.label} 
                    active={formData.jobCategory === item.label}
                    onClick={() => handleSingleSelect('jobCategory', item.label)}
                  />
                ))}
              </div>
            </section>

            {/* 2. 경력 단계 (단일) */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6">2. 현재 어느 단계에 계신가요?</h2>
              <div className="flex flex-wrap gap-3">
                {['취준생 / 신입', '주니어 (1~3년)', '미들 (4~7년)', '시니어 (8년 이상)'].map((stage) => (
                  <button 
                    key={stage} 
                    onClick={() => handleSingleSelect('careerStage', stage)}
                    className={`px-8 py-4 rounded-full font-bold transition-all border-2 ${formData.careerStage === stage ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </section>

            {/* 3. 준비 방식 (복수) */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6">3. 어떤 방식으로 준비하고 계신가요? (복수 선택)</h2>
              <div className="flex flex-wrap gap-3">
                {['포트폴리오 정리', '실전 면접 대비', '경험 기술서 작성', '코딩 테스트/과제'].map(method => (
                  <MethodTag 
                    key={method}
                    label={method} 
                    active={formData.preparationMethod.includes(method)}
                    onClick={() => handleMultiSelect(method)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* 저장 버튼 */}
          <section className="mt-20 flex flex-col items-center">
            <button 
              onClick={() => {
                console.log("서버로 보낼 데이터:", formData);
                navigate('/experiences');
              }}
              className="w-full max-w-[400px] h-16 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              저장하고 시작하기 <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

// 서브 컴포넌트들
const JobButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-6 bg-white border-2 rounded-2xl transition-all ${active ? 'border-indigo-600 shadow-xl shadow-indigo-100/50' : 'border-transparent hover:border-slate-200 shadow-sm'}`}
  >
    <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </div>
    <span className={`font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
  </button>
);

const MethodTag = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`group flex items-center gap-2 px-6 py-4 border-2 rounded-xl font-bold transition-all ${active ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'}`}
  >
    <FontAwesomeIcon icon={active ? faCheck : faCircle} className={active ? "text-sm" : "text-sm text-slate-200 group-hover:text-indigo-200"} />
    {label}
  </button>
);

export default Onboarding;