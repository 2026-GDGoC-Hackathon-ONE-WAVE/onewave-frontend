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

  // 1. 모든 값이 비어있는 상태로 초기화 (기본 선택 해제)
  const [formData, setFormData] = useState({
    name: '',
    jobCategory: '', // 기본값 제거
    careerStage: '', // 기본값 제거
    preparationMethod: [], // 빈 배열로 시작
  });

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 단일 선택 핸들러
  const handleSingleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 복수 선택 핸들러
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

  // 저장 버튼 클릭 시 유효성 검사
  const handleSubmit = () => {
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

    console.log('서버로 보낼 최종 데이터:', formData);
    localStorage.setItem('hasOnboarded', 'true');
    localStorage.setItem('userName', formData.name);
    navigate('/experiences');
  };

  return (
    <div className="ui-screen bg-[#F8FAFC]">
      <div id="app" className="relative w-full min-h-screen overflow-x-hidden">
        <main className="relative z-10 w-full max-w-[840px] mx-auto px-6 md:px-20 pt-20 pb-32">
          <section className="mb-16 text-center">
            <h1 className="text-[42px] font-black text-slate-900 leading-tight mb-4 text-left">
              나만의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
                커리어 서사
              </span>
              를<br />
              시작해볼까요?
            </h1>
          </section>

          <div className="space-y-16">
            {/* 0. 이름 입력 */}
            <section className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  0
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                  어떻게 불러드리면 될까요?
                </h2>
              </div>
              <div className="relative max-w-[400px]">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="성함을 입력해 주세요"
                  className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                />
              </div>
            </section>

            {/* 1. 직군 선택 (기본 선택 없음) */}
            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  1
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                  희망하는 직군을 선택해주세요
                </h2>
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
                    onClick={() =>
                      handleSingleSelect('jobCategory', item.label)
                    }
                  />
                ))}
              </div>
            </section>

            {/* 2. 경력 단계 (기본 선택 없음) */}
            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  2
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                  현재 어느 단계에 계신가요?
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  '취준생 / 신입',
                  '주니어 (1~3년)',
                  '미들 (4~7년)',
                  '시니어 (8년 이상)',
                ].map((stage) => (
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

            {/* 3. 준비 방식 (복수 선택) */}
            <section className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  3
                </span>
                <h2 className="text-xl font-bold text-slate-800">
                  어떤 방식으로 준비하고 계신가요? (복수 선택)
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  '포트폴리오 정리',
                  '실전 면접 대비',
                  '경험 기술서 작성',
                  '코딩 테스트/과제',
                ].map((method) => (
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

// 서브 컴포넌트 동일 유지
const JobButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-6 bg-white border-2 rounded-2xl transition-all ${active ? 'border-indigo-600 shadow-xl shadow-indigo-100/50' : 'border-transparent hover:border-slate-200 shadow-sm'}`}
  >
    <div
      className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </div>
    <span
      className={`font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}
    >
      {label}
    </span>
  </button>
);

const MethodTag = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-2 px-6 py-4 border-2 rounded-xl font-bold transition-all ${active ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'}`}
  >
    <FontAwesomeIcon
      icon={active ? faCheck : faCircle}
      className={
        active
          ? 'text-sm'
          : 'text-sm text-slate-200 group-hover:text-indigo-200'
      }
    />
    {label}
  </button>
);

export default Onboarding;
