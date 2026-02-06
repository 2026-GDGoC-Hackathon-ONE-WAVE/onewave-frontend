import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faArrowRight,
  faBrain,
  faChartLine,
  faShieldHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Landing = () => {
  const navigate = useNavigate(); // 이동 함수 생성

  return (
    <div className="ui-screen">
      <div
        id="app"
        className="relative w-full min-h-screen bg-white overflow-x-hidden"
      >
        {/* --- Navigation --- */}
        <nav
          id="header"
          className="sticky top-0 z-50 w-full h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-20"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center">
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className="text-white text-xl"
              />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#222222]">
              RE:TRACE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 text-[15px] font-bold text-gray-600 hover:text-[#222222]">
              로그인
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-3 bg-[#222222] text-white rounded-full text-[15px] font-bold hover:bg-black transition-all shadow-lg shadow-black/10"
            >
              무료로 시작하기
            </button>
          </div>
        </nav>

        {/* --- Hero Section --- */}
        <main
          id="hero-section"
          className="relative w-full min-h-[840px] flex items-center px-20 bg-[#F9FAFB]"
        >
          <div className="w-1/2 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full w-fit shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#00E676]"></span>
              <span className="text-[14px] font-bold text-gray-600 uppercase tracking-wider">
                New Standard of Career Reflection
              </span>
            </div>
            <h1 className="text-[72px] font-black leading-[1.1] text-[#222222] tracking-tight">
              탈락을 질문으로
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
                돌아보는 취업 회고
              </span>
            </h1>
            <div className="flex flex-col gap-2">
              <p className="text-[24px] font-medium text-gray-500">
                답을 주지 않고, 생각을 정리합니다.
              </p>
              <p className="text-[18px] text-gray-400">
                단순한 피드백이 아닌, 나만의 정답을 찾아가는 질문형 회고 서비스
                RE:TRACE
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => navigate('/onboarding')} // 클릭 시 온보딩 페이지로 이동
                className="px-10 py-5 bg-[#222222] text-white rounded-2xl text-[20px] font-bold flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-xl shadow-black/20"
              >
                경험 돌아보기 시작 <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button
                onClick={() => navigate('/service-guide')}
                className="px-10 py-5 bg-white border-2 border-gray-200 text-[#222222] rounded-2xl text-[20px] font-bold hover:bg-gray-50 transition-colors"
              >
                서비스 가이드
              </button>
            </div>
          </div>

          <div className="w-1/2 relative">
            <div className="relative z-10 w-full h-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
              <img
                className="w-full h-full object-cover"
                src="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-26eb48e4-a250-4cd5-841b-f1343da83af9.jpg"
                alt="Reflection"
              />
            </div>
          </div>
        </main>

        {/* --- Value Proposition --- */}
        <section id="value-proposition" className="w-full py-32 px-20 bg-white">
          <div className="flex flex-col items-center text-center gap-6 mb-20">
            <h2 className="text-[48px] font-black text-[#222222]">
              왜 상담이 아니라 회고인가요?
            </h2>
            <p className="text-[20px] text-gray-500 max-w-[700px]">
              단순히 '왜 떨어졌을까'를 분석하는 것은 답을 주지 못합니다.
              <br />
              스스로에게 던지는 깊이 있는 질문만이 다음 성장을 위한 진짜 답을
              찾아줍니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <FeatureCard
              icon={faBrain}
              title="구조화된 질문 시스템"
              desc="단순한 일기가 아닙니다. 전문 심리학과 인사이트를 바탕으로 설계된 질문 트리가 당신의 생각을 깊게 파고듭니다."
            />
            <FeatureCard
              icon={faChartLine}
              title="경험의 데이터화"
              desc="휘발되는 감정을 기록하고, 반복되는 패턴을 발견하여 나만의 강점 키워드로 변환해 드립니다."
            />
            <FeatureCard
              icon={faShieldHeart}
              title="멘탈 회복 탄력성"
              desc="탈락의 아픔을 객관적으로 바라보는 과정을 통해, 좌절이 아닌 다음 도전을 위한 에너지를 얻습니다."
            />
          </div>
        </section>

        {/* --- Footer --- */}
        <footer
          id="footer"
          className="w-full py-16 px-20 bg-[#111111] text-white"
        >
          <div className="flex justify-between items-start border-b border-white/10 pb-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    className="text-[#111111] text-sm"
                  />
                </div>
                <span className="text-xl font-black tracking-tighter">
                  RE:TRACE
                </span>
              </div>
              <p className="text-gray-400 text-[15px]">
                우리는 당신의 실패를 성공의 가장 강력한 질문으로 바꿉니다.
              </p>
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col gap-4">
                <span className="font-bold text-white text-[16px]">
                  Service
                </span>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="text-left text-gray-400 hover:text-white text-[14px]"
                >
                  회고 시작하기
                </button>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-[14px]"
                >
                  이용 가이드
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold text-white text-[16px]">Social</span>
                <div className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-xl text-gray-400 hover:text-white cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-xl text-gray-400 hover:text-white cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="text-xl text-gray-400 hover:text-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 text-gray-500 text-[13px]">
            © 2026 RE:TRACE. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

// --- 서브 컴포넌트: 특장점 카드 ---
const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="p-10 bg-[#F9FAFB] rounded-[32px] border border-transparent hover:border-[#6366F1] transition-all group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#6366F1] transition-colors">
        <FontAwesomeIcon
          icon={icon}
          className="text-2xl text-[#6366F1] group-hover:text-white"
        />
      </div>
      <h3 className="text-[24px] font-bold text-[#222222] mb-4">{title}</h3>
      <p className="text-[17px] text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default Landing;
