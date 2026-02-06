import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';

function App() {
  return (
    <Router>
      <div className="App font-['Pretendard']">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experience-detail" element={<ExperienceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;