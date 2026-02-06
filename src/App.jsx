import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReflectionChat from './pages/ReflectionChat.jsx';
import ReflectionSummary from './pages/ReflectionSummary.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
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
