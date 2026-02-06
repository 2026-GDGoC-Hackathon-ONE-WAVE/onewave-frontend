import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import Dashboard from './pages/Dashboard.jsx';
import ReflectionChat from './pages/ReflectionChat.jsx';
import ReflectionSummary from './pages/ReflectionSummary.jsx';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App font-['Pretendard']">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experience-detail" element={<ExperienceDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reflection" element={<ReflectionChat />} />
        <Route path="/reflection/summary" element={<ReflectionSummary />} />
        <Route
          path="/reflection/summary/:reflectionId"
          element={<ReflectionSummary />}
        />
      </Routes>
    </div>
  );
}

export default App;
