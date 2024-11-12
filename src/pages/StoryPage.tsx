
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

  const speakStory = () => {
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(storyText);
  

    utterance.rate = 0.9; 
    utterance.pitch = 1.2; 
  
    const voices = window.speechSynthesis.getVoices();
    const childFriendlyVoice = voices.find(
      (voice) => voice.name.includes("Google UK English Female") || voice.name.includes("Microsoft Zira")
    );
  
    if (childFriendlyVoice) {
      utterance.voice = childFriendlyVoice;
    }
  
    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="story-container">
      <h1>Your Custom Story</h1>
      <p>{storyText}</p>
      <div className="narration-controls">
        <button onClick={speakStory} className="play-narration-button">
          Play Narration
        </button>
        <button onClick={stopNarration} className="stop-narration-button">
          Stop Narration
        </button>
      </div>
      <button onClick={handleBackToForm} className="back-to-form-button">
        Let's Create Another Story!
      </button>
    </div>
  );
};

export default StoryPage;
