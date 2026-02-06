import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faCode, 
  faPenNib, 
  faChartLine, 
  faBullhorn, 
  faCheck, 
  faArrowRight,
  faCircleQuestion,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="ui-screen bg-[#F8FAFC]">
      <div id="app" className="relative w-full min-h-screen overflow-x-hidden">
        {/* Decorative Background */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]"></div>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full h-20 bg-white/80 backdrop-blur-md px-12 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBolt} className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">RE:TRACE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-8 h-1.5 rounded-full bg-indigo-600"></div>
              <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
              <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
            </div>
            <span className="text-sm font-medium text-slate-400">Step 01/03</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 w-full max-w-[840px] mx-auto pt-20 pb-32">
          {/* Title Section */}
          <section className="mb-16 text-center">
            <h1 className="text-[42px] font-black text-slate-900 leading-tight mb-4">
              나만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">커리어 서사</span>를<br/>시작해볼까요?
            </h1>
            <p className="text-lg text-slate-500">간단한 정보만 알려주시면 AI가 최적화된 질문을 준비할게요.</p>
          </section>

          {/* Form Section */}
          <div className="space-y-12">
            {/* 1. Job Selection */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">1</span>
                <h2 className="text-xl font-bold text-slate-800">희망하는 직군을 선택해주세요</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <JobButton icon={faCode} label="개발" active />
                <JobButton icon={faPenNib} label="디자인" />
                <JobButton icon={faChartLine} label="기획/PM" />
                <JobButton icon={faBullhorn} label="마케팅" />
              </div>
            </section>

            {/* 2. Career Stage */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">2</span>
                <h2 className="text-xl font-bold text-slate-800">현재 어느 단계에 계신가요?</h2>
              </div>
              <div className="flex gap-3">
                {['취준생 / 신입', '주니어 (1~3년)', '미들 (4~7년)', '시니어 (8년 이상)'].map((stage) => (
                  <button 
                    key={stage} 
                    className={`px-8 py-4 rounded-full font-bold transition-all border-2 ${stage === '주니어 (1~3년)' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Preparation Method */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">3</span>
                <h2 className="text-xl font-bold text-slate-800">어떤 방식으로 준비하고 계신가요?</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <MethodTag label="포트폴리오 정리" active />
                <MethodTag label="실전 면접 대비" />
                <MethodTag label="경험 기술서 작성" active />
                <MethodTag label="코딩 테스트/과제" />
              </div>
            </section>
          </div>

          {/* Bottom Action */}
          <section className="mt-20 flex flex-col items-center">
            <button 
              onClick={() => navigate('/experiences')}
              className="w-full max-w-[400px] h-16 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              저장하고 시작하기
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <p className="mt-6 text-sm text-slate-400">설정된 정보는 나중에 마이페이지에서 수정할 수 있어요.</p>
          </section>
        </main>

        {/* Floating Help Button */}
        <button className="fixed bottom-12 right-12 w-14 h-14 bg-white border border-slate-100 rounded-full shadow-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors">
          <FontAwesomeIcon icon={faCircleQuestion} className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

// --- 서브 컴포넌트 ---
const JobButton = ({ icon, label, active }) => (
  <button className={`group flex flex-col items-center justify-center p-6 bg-white border-2 rounded-2xl transition-all ${active ? 'border-indigo-600 shadow-xl shadow-indigo-100/50' : 'border-transparent hover:border-slate-200 shadow-sm'}`}>
    <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </div>
    <span className={`font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
  </button>
);

const MethodTag = ({ label, active }) => (
  <button className={`group flex items-center gap-2 px-6 py-4 border-2 rounded-xl font-bold transition-all ${active ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'}`}>
    <FontAwesomeIcon icon={active ? faCheck : faCircle} className={active ? "text-sm" : "text-sm text-slate-200 group-hover:text-indigo-200"} />
    {label}
  </button>
);

export default Onboarding;