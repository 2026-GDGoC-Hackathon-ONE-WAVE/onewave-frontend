import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReflectionChat from './pages/ReflectionChat.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/reflection" element={<ReflectionChat />} />
    </Routes>
  );
}

export default App;
