import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBoltLightning, 
  faArrowRight, 
  faPlus, 
  faXmark, 
  faHouseChimney, 
  faLayerGroup, 
  faChartPie, 
  faUser,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const Experiences = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  return (
    <div className="ui-screen bg-[#F8F9FD]">
      <div id="app" className="relative w-full min-h-screen font-['Pretendard'] overflow-x-hidden pb-32">
        
        {/* --- Header --- */}
        <header className="sticky top-0 z-50 w-full h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-[#6366F1] to-[#A855F7] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <FontAwesomeIcon icon={faBoltLightning} className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">FAIL-LOG</span>
          </div>
          <nav className="flex items-center gap-8 font-bold text-gray-500">
            <button className="text-gray-900">내 경험</button>
            <button className="hover:text-indigo-600 transition-colors">인사이트</button>
            <button className="hover:text-indigo-600 transition-colors">커뮤니티</button>
            <div className="flex items-center gap-3 ml-4">
              <img src="https://vinsign.app/resources/avatars/avatar-5.png" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User Profile" />
              <span className="text-gray-700">김지우 님</span>
            </div>
          </nav>
        </header>

        <main className="px-10 py-12">
          {/* --- Hero CTA Section --- */}
          <section className="relative w-full h-[240px] bg-gradient-to-br from-[#1E1B4B] to-[#312E81] rounded-[32px] mb-12 overflow-hidden flex items-center justify-between px-16 shadow-2xl">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                아직 정리되지 않은<br />
                <span className="text-[#DFFF00]">3개의 경험</span>이 기다리고 있어요.
              </h1>
              <button className="group flex items-center gap-3 bg-[#DFFF00] hover:bg-[#EFFF50] text-[#1E1B4B] px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                최근 경험 돌아보기
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative w-[300px] h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent blur-3xl"></div>
              <img className="relative z-10 w-[280px] h-[280px] object-contain drop-shadow-2xl" src="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-ad8159ae-7156-4170-a7f7-c11960fee2e9.jpg" alt="Character Illustration" />
            </div>
          </section>

          {/* --- Experience Grid --- */}
          <div className="grid grid-cols-3 gap-8">
            {/* 새로운 경험 추가하기 카드 */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-white border-2 border-dashed border-gray-200 rounded-[28px] p-8 flex flex-col items-center justify-center gap-6 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer min-h-[420px]"
            >
              <div className="w-20 h-20 bg-gray-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-gray-400 group-hover:text-indigo-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">새로운 경험 추가하기</h3>
                <p className="text-gray-400 leading-relaxed">잊기 전에 당신의 소중한<br />성장 기록을 남겨보세요.</p>
              </div>
            </div>

            {/* 기업 카드 예시 1 */}
            <ExperienceCard 
              company="토스 (비바리퍼블리카)" 
              date="2025.02.14" 
              tag="Product Designer" 
              status="최종 탈락" 
              step="최종 임원 면접" 
              progress="회고 중"
              imgUrl="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-d7b8662c-63fe-458a-bdfd-57de8cf7580f.jpg"
            />

            {/* 기업 카드 예시 2 */}
            <ExperienceCard 
              company="당근 (당근마켓)" 
              date="2025.01.28" 
              tag="UX Researcher" 
              status="1차 탈락" 
              step="직무 역량 인터뷰" 
              progress="회고 전"
              imgUrl="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-3a9fbdb2-4f0b-4eab-81c5-57234478e64e.jpg"
              isStart
            />
          </div>
        </main>

        {/* --- 하단 네비게이션 --- */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-100 px-8 py-4 rounded-full shadow-2xl flex items-center gap-10 z-40">
          <NavBtn icon={faHouseChimney} label="홈" active />
          <NavBtn icon={faLayerGroup} label="경험함" />
          <div onClick={() => setIsModalOpen(true)} className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg -mt-2 hover:scale-110 transition-transform cursor-pointer">
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </div>
          <NavBtn icon={faChartPie} label="통계" />
          <NavBtn icon={faUser} label="마이" />
        </div>

        {/* --- 새 경험 추가 모달 (Overlay) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[500px] rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900">새 경험 추가</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                {/* 회사명 입력 */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">회사/조직명</label>
                  <input 
                    type="text" 
                    placeholder="예: 구글 코리아" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" 
                  />
                </div>

                {/* 날짜 및 직무 입력 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">면접 본 날짜</label>
                    <input 
                      type="text" 
                      placeholder="2025.02.24" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">지원 직무</label>
                    <input 
                      type="text" 
                      placeholder="예: FE 개발자" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" 
                    />
                  </div>
                </div>

                {/* 전형 선택 */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">탈락한 전형</label>
                  <div className="relative">
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium appearance-none cursor-pointer">
                      <option>서류 전형</option>
                      <option>과제/코딩 테스트</option>
                      <option>1차 면접</option>
                      <option>2차 면접</option>
                      <option>최종 면접</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/experience-detail', { state: { company: '새로운 경험' } });
                  }}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all mt-4 shadow-xl active:scale-[0.98]"
                >
                  경험 저장하고 시작하기
                </button>
                <p className="text-center text-xs font-bold text-gray-400">추가 시 회고 상태는 '회고 전'으로 설정됩니다.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 서브 컴포넌트: 경험 카드 ---
const ExperienceCard = ({ company, date, tag, status, step, progress, imgUrl, isStart }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/experience-detail', { state: { company, tag, date, step } })}
      className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[420px] cursor-pointer"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
              <img src={imgUrl} className="w-10 h-10 object-contain" alt="Company Logo" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">{company}</h3>
              <p className="text-sm font-medium text-gray-400">{date}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${status === '최종 탈락' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {status}
          </div>
        </div>
        <div className="space-y-4">
          <span className="inline-block px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">{tag}</span>
          <div className="p-4 bg-gray-50 rounded-2xl">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">탈락 전형</p>
            <p className="text-gray-900 font-bold">{step}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${progress === '회고 중' ? 'bg-orange-400 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-sm font-bold text-gray-700">{progress}</span>
        </div>
        <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${isStart ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
          {isStart ? '회고 시작' : '이어하기'}
        </button>
      </div>
    </div>
  );
};

// --- 서브 컴포넌트: 네비게이션 버튼 ---
const NavBtn = ({ icon, label, active }) => (
  <button className={`flex flex-col items-center gap-1 ${active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
    <FontAwesomeIcon icon={icon} className="text-xl" />
    <span className="text-[10px] font-black">{label}</span>
  </button>
);

export default Experiences;