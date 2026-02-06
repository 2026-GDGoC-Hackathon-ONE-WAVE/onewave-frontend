import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 우리가 만든 페이지들 임포트
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import ServiceGuide from './pages/ServiceGuide'; // 새로 추가된 가이드 페이지

function App() {
  return (
    <Router>
      {/* 폰트는 우리가 설정한 Pretendard가 전체적으로 적용되도록 wrap 합니다 */}
      <div className="App font-['Pretendard']">
        <Routes>
          {/* 1. 메인 랜딩 페이지 */}
          <Route path="/" element={<Landing />} />
          
          {/* 2. 서비스 가이드 페이지 */}
          <Route path="/service-guide" element={<ServiceGuide />} />
          
          {/* 3. 사용자 정보 입력 온보딩 (직군, 경력 등 선택) */}
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* 4. 메인 대시보드 (경험 보관함 리스트) */}
          <Route path="/experiences" element={<Experiences />} />
          
          {/* 5. 개별 경험 상세 보기 리포트 */}
          <Route path="/experience-detail" element={<ExperienceDetail />} />
          
          {/* 6. AI 회고 채팅 (추후 구현 예정인 경로 미리 확보) */}
          {/* <Route path="/reflection-chat" element={<ReflectionChat />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;