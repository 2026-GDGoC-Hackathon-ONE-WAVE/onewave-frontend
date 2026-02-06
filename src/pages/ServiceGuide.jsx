import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faComments,
  faFileLines,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const ServiceGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="ui-screen bg-[#F9FAFB]">
      <div id="app" className="relative w-full min-h-screen overflow-x-hidden">
        {/* --- Header Section --- */}
        <header className="w-full pt-24 pb-16 px-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <span className="text-[14px] font-bold text-[#6366F1]">
              HOW TO USE
            </span>
          </div>
          <h1 className="text-[56px] font-black text-[#222222] leading-tight mb-6">
            당신의 경험이 자산이 되도록,
            <br />
            <span className="text-[#6366F1]">회고 가이드</span>
          </h1>
          <p className="text-[20px] text-gray-500 max-w-[700px] mx-auto">
            단순한 기록을 넘어 성장의 발판이 되는 RE:TRACE의
            <br /> 4단계 회고 프로세스를 소개합니다.
          </p>
        </header>

        {/* --- Step Section --- */}
        <section className="px-20 pb-32">
          <div className="grid grid-cols-1 gap-12 max-w-[1000px] mx-auto">
            <StepItem
              num="01"
              icon={faPlus}
              title="탈락 경험 등록"
              desc="준비했던 공고명과 직무를 입력하세요. 아직 정리되지 않은 감정들을 마주하는 첫 걸음입니다."
            />
            <StepItem
              num="02"
              icon={faComments}
              title="AI와 함께하는 1:1 회고 채팅"
              desc="AI가 당신의 답변을 바탕으로 꼬리 질문을 던집니다. 구체적인 상황을 떠올리며 스스로 정답을 찾아보세요."
            />
            <StepItem
              num="03"
              icon={faFileLines}
              title="데이터 기반 강점 리포트"
              desc="채팅 내용을 분석하여 당신의 강점 키워드와 개선 포인트를 도출해 드립니다. 휘발되는 경험을 데이터로 만드세요."
            />
            <StepItem
              num="04"
              icon={faCircleCheck}
              title="다음 도전을 위한 로드맵"
              desc="분석된 데이터를 바탕으로 다음 면접이나 자소서에서 강조해야 할 핵심 서사를 완성합니다."
            />
          </div>
        </section>

        {/* --- Bottom CTA --- */}
        <section className="bg-[#222222] py-24 px-20 text-center">
          <h2 className="text-[40px] font-black text-white mb-8">
            준비되셨나요? 당신의 서사를 시작하세요.
          </h2>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-12 py-6 bg-white text-[#222222] rounded-2xl text-[20px] font-bold hover:bg-gray-100 transition-all shadow-xl shadow-black/20"
          >
            지금 바로 회고 시작하기
          </button>
        </section>
      </div>
    </div>
  );
};

// --- 서브 컴포넌트: 단계 아이템 ---
const StepItem = ({ num, icon, title, desc }) => (
  <div className="flex items-start gap-10 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex flex-col items-center gap-4">
      <span className="text-[24px] font-black text-[#6366F1]/30">{num}</span>
      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-[#6366F1]">
        <FontAwesomeIcon icon={icon} className="text-3xl" />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-[28px] font-black text-[#222222]">{title}</h3>
      <p className="text-[18px] text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default ServiceGuide;
