// src/pages/StoryPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  storyText: string;
}

const StoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyText } = location.state as LocationState;

  const handleBackToForm = () => {
    navigate('/'); 
  };

  return (
    <div className="story-container">
      <h1>Here is your story!</h1>
      <p>{storyText}</p>
      <button onClick={handleBackToForm} className="back-to-form-button">
        Lets make a new story!
      </button>
    </div>
  );
};

export default StoryPage;
