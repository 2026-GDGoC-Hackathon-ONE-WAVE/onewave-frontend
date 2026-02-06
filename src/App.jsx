import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReflectionChat from './pages/ReflectionChat.jsx';
import ReflectionSummary from './pages/ReflectionSummary.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reflection" element={<ReflectionChat />} />
      <Route path="/reflection/summary" element={<ReflectionSummary />} />
      <Route
        path="/reflection/summary/:reflectionId"
        element={<ReflectionSummary />}
      />
    </Routes>
  );
}

export default App;
