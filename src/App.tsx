// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Title from './components/Title';
import FormPage from './pages/FormPage';
import StoryPage from './pages/StoryPage';
import WelcomePage from './pages/WelcomePage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Title/>
        <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/story" element={<StoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
