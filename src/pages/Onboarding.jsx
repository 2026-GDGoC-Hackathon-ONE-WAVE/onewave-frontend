import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faPenNib,
  faChartLine,
  faBullhorn,
  faCheck,
  faArrowRight,
  faCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Onboarding = () => {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    jobCategory: '', 
    careerStage: '', 
    preparationMethod: [], 
  });

  // 2. 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 백엔드 Base URL 설정
  const BASE_URL = 'https://spring-app-343780568798.asia-northeast3.run.app';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (value) => {
    setFormData((prev) => {
      const { preparationMethod } = prev;
      if (preparationMethod.includes(value)) {
        return {
          ...prev,
          preparationMethod: preparationMethod.filter((item) => item !== value),
        };
      } else {
        return { ...prev, preparationMethod: [...preparationMethod, value] };
      }
    });
  };

  // 🔥 실제 백엔드 주소로 데이터 전송
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('성함을 입력해 주세요.');
      return;
    }
    if (!formData.jobCategory) {
      alert('희망 직군을 선택해 주세요.');
      return;
    }
    if (!formData.careerStage) {
      alert('경력 단계를 선택해 주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ 알려주신 백엔드 주소를 적용했습니다.
      const response = await fetch(`${BASE_URL}/api/users/1`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // 성공 시 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('hasOnboarded', 'true');
        localStorage.setItem('userName', result.data.name);
        localStorage.setItem('userId', result.data.userId); // 서버가 준 실제 ID 저장

        alert(result.message);
        navigate('/experiences');
      } else {
        alert(result.message || '정보 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 연결 에러:', error);
      alert('서버와 통신할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ui-screen bg-[#F8FAFC]">
      <div id="app" className="relative w-full min-h-screen overflow-x-hidden">
        <main className="relative z-10 w-full max-w-[840px] mx-auto px-6 md:px-20 pt-20 pb-32">
          <section className="mb-16 text-center">
            <h1 className="text-[42px] font-black text-slate-900 leading-tight mb-4 text-left">
              나만의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#FDBA74]">
                커리어 서사
              </span>
              를<br />
              시작해볼까요?
            </h1>
          </section>

          <div className="space-y-16">
            <section className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">0</span>
                <h2 className="text-xl font-bold text-slate-800">어떻게 불러드리면 될까요?</h2>
              </div>
              <div className="relative max-w-[400px]">
                <FontAwesomeIcon icon={faUser} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="성함을 입력해 주세요"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-700"
                />
              </div>
            </section>

            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">1</span>
                <h2 className="text-xl font-bold text-slate-800">희망하는 직군을 선택해주세요</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: '개발', icon: faCode },
                  { label: '디자인', icon: faPenNib },
                  { label: '기획/PM', icon: faChartLine },
                  { label: '마케팅', icon: faBullhorn },
                ].map((item) => (
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

            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">2</span>
                <h2 className="text-xl font-bold text-slate-800">현재 어느 단계에 계신가요?</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {['취준생 / 신입', '주니어 (1~3년)', '미들 (4~7년)', '시니어 (8년 이상)'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handleSingleSelect('careerStage', stage)}
                    className={`px-8 py-4 rounded-full font-bold transition-all border-2 ${formData.careerStage === stage ? 'bg-gradient-to-r from-[#FB923C] to-[#FDBA74] border-[#FB923C] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-orange-200'}`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </section>

            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">3</span>
                <h2 className="text-xl font-bold text-slate-800">어떤 방식으로 준비하고 계신가요? (복수 선택)</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {['포트폴리오 정리', '실전 면접 대비', '경험 기술서 작성', '코딩 테스트/과제'].map((method) => (
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

          <section className="mt-20 flex flex-col items-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full max-w-[400px] h-16 rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-slate-900 hover:bg-gradient-to-r hover:from-[#FB923C] hover:to-[#FDBA74] text-white'
              }`}
            >
              {isLoading ? '정보 저장 중...' : '저장하고 시작하기'} 
              {!isLoading && <FontAwesomeIcon icon={faArrowRight} />}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

// --- 서브 컴포넌트 ---
const JobButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-6 bg-white border-2 rounded-2xl transition-all ${active ? 'border-orange-600 shadow-orange-100/50' : 'border-transparent hover:border-slate-200 shadow-sm'}`}
  >
    <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'bg-gradient-to-r from-[#FB923C] to-[#FDBA74] text-white' : 'bg-slate-50 text-slate-400'}`}>
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </div>
    <span className={`font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{label}</span>
  </button>
);

const MethodTag = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-2 px-6 py-4 border-2 rounded-xl font-bold transition-all ${active ? 'bg-gradient-to-r from-[#FB923C] to-[#FDBA74] border-[#FB923C] text-white' : 'bg-white border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-600'}`}
  >
    <FontAwesomeIcon icon={active ? faCheck : faCircle} className={active ? 'text-sm' : 'text-sm text-slate-200 group-hover:text-orange-200'} />
    {label}
  </button>
);

export default Onboarding;