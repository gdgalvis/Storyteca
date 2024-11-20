
import React from 'react';
import { useNavigate } from 'react-router-dom';

import welcomeImage from '../assets/welcome.png'; 
const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
  
    const handleStart = () => {
      navigate('/form'); 
    };
  
    return (
      <div className="welcome-container">
        <img
          src={welcomeImage}
          alt="Start Your Journey"
          className="welcome-image"
          onClick={handleStart}
        />
      </div>
    );
  };
  
  export default WelcomePage;
