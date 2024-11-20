import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LocationState {
  storyText: string;
}

const StoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyText } = location.state as LocationState;

  const handleBackToForm = () => {
    navigate('/form');
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

  const downloadStoryAsPDF = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');

    const storyElement = document.getElementById('story-content');

    if (storyElement) {
      const canvas = await html2canvas(storyElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40);
      
      pdf.save('Custom_Story.pdf');
    }
  };

  return (
    <div className="story-container">
      <button
        onClick={downloadStoryAsPDF}
        className="download-pdf-button"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Download as PDF
      </button>
      
      <h1>Your Custom Story</h1>
      <div id="story-content" className="story-content">
        <p>{storyText}</p>
      </div>
      
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
