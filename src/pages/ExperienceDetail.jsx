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
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

const ExperienceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 1. Experiences 페이지에서 넘어온 데이터를 안전하게 받아옵니다.
   * navigate('/experience-detail', { state: { ... } }) 로 보낸 정보가 location.state에 담깁니다.
   */
  const expData = location.state;

  // 데이터가 없을 경우를 대비한 기본값 설정 (새로고침 시 등)
  const displayData = expData || {
    company: "정보 없음",
    tag: "직무 미지정",
    date: "2025-00-00",
    step: "미지정 전형",
    simpleMemo: "작성된 메모가 없습니다."
  };

  const handleLogoClick = () => {
    const hasOnboarded = localStorage.getItem('hasOnboarded');
    if (hasOnboarded) {
      navigate('/experiences');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="ui-screen bg-[#F9FAFB]">
      <div id="app" className="relative w-full min-h-screen font-sans text-[#1A1A1A]">
        
        {/* --- Header --- */}
        <header className="sticky top-0 z-50 w-full h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-[120px]">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowsRotate} className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#222222]">RE:TRACE</span>
          </div>
          <nav className="flex items-center gap-10 font-bold text-gray-500">
            <button className="hover:text-[#6366F1] transition-colors" onClick={() => navigate('/experiences')}>대시보드</button>
            <button className="text-[#1A1A1A]">경험 보관함</button>
            <button className="hover:text-[#6366F1] transition-colors">회고 리포트</button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <img src="https://vinsign.app/resources/avatars/avatar-5.png" alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#6366F1]" />
          </div>
        </header>

        {/* --- Main Content --- */}
        <main className="px-[120px] py-[60px] flex flex-col items-center">
          {/* Breadcrumbs */}
          <div className="w-full max-w-[800px] mb-8 flex items-center gap-2 text-sm font-medium text-gray-400">
            <span className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/experiences')}>나의 경험</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
            <span className="text-gray-900 font-bold">상세 보기</span>
          </div>

          {/* Experience Detail Card */}
          <div className="w-full max-w-[800px] bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[#6366F1]/5 to-transparent rounded-full -mr-20 -mt-20 blur-3xl"></div>

            <div className="relative z-10 flex justify-between items-start mb-12">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-sm font-bold mb-4">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  채용 프로세스
                </div>
                <h1 className="text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                  {displayData.company}<br/>
                  <span className="text-gray-400 font-bold">{displayData.tag}</span>
                </h1>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-400 mb-1 block">{displayData.date}</span>
                <div className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-lg">
                  {displayData.step}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 mb-12"></div>

            <div className="grid grid-cols-1 gap-10 relative z-10 text-left">
              <section>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">간단 메모</label>
                <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    "{displayData.simpleMemo || "작성된 메모가 없습니다."}"
                  </p>
                </div>
              </section>

              <div className="flex items-center justify-between p-8 bg-gradient-to-r from-[#6366F1]/5 to-[#D946EF]/5 rounded-[32px] border border-white">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl">✨</div>
                  <div>
                    <label className="block text-sm font-bold text-[#6366F1] mb-1">현재 감정</label>
                    <span className="text-2xl font-black text-gray-900">설렘과 확신</span>
                  </div>
                </div>
                <div className="text-right">
                  <label className="block text-sm font-bold text-gray-400 mb-1 text-left">회고 상태</label>
                  <div className="flex items-center gap-2 text-[#D946EF] font-bold">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span>회고 전</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- CTA Button --- */}
            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => navigate('/reflection-chat')}
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-gray-900 text-white rounded-[24px] font-black text-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#D946EF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  <FontAwesomeIcon icon={faRotateLeft} />
                  이 경험 돌아보기
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <button className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors">
              <FontAwesomeIcon icon={faPenToSquare} /> 정보 수정하기
            </button>
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
            <button className="flex items-center gap-2 text-gray-400 font-bold hover:text-red-500 transition-colors">
              <FontAwesomeIcon icon={faTrashCan} /> 삭제하기
            </button>
          </div>
        </main>

        <div className="fixed bottom-10 right-10 flex flex-col gap-4">
          <button className="w-16 h-16 bg-white shadow-2xl rounded-full flex items-center justify-center text-gray-900 text-xl hover:bg-gray-50 transition-all border border-gray-100">
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
          <button onClick={() => navigate('/experiences')} className="w-16 h-16 bg-gray-900 shadow-2xl rounded-full flex items-center justify-center text-white text-xl hover:scale-110 transition-all">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;