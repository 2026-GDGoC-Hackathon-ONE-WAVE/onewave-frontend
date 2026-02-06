import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import profileImg from '.././assets/profile.png';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '홈', path: '/' },
    { label: '내 경험', path: '/experiences' },
    { label: '대시보드', path: '/dashboard' },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const isOnboarding = location.pathname === '/onboarding';

  // 특정 페이지(예: 회고 채팅)에서는 헤더를 숨기고 싶을 경우를 대비한 로직
  const hideHeaderPaths = ['/reflection'];
  if (hideHeaderPaths.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="w-full h-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          {/* <div className="w-10 h-10 bg-[#222222] rounded-xl flex items-center justify-center">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className="text-white text-xl"
            />
          </div> */}
          <span className="text-2xl font-black tracking-tighter text-[#222222]">
            RE:TRACE
          </span>
        </div>

        {!isOnboarding && (
          <>
            <nav className="hidden md:flex items-center gap-8 font-bold">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`transition-colors ${
                    location.pathname === item.path
                      ? 'text-[#222222]'
                      : 'text-gray-400 hover:text-[#222222]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                <img
                  src={profileImg}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  alt="User"
                />
                <span className="hidden lg:block text-gray-700 font-bold text-sm">
                  김지우 님
                </span>
              </div>
            </div>
          </>
        )}

        {isOnboarding && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Step 01 / 01
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
