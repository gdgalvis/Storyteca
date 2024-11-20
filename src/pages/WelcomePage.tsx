
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import welcomeImage from '../assets/welcome.png'; 
const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/form'); 
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Storyteca</h1>
      <ImageContainer currentImage={welcomeImage} />
      <button className="start-button" onClick={handleStart}>
        Start Your Journey
      </button>
    </div>
  );
};

export default WelcomePage;
