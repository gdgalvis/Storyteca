import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LocationState {
  storyText: string;
  language: 'en' | 'es'; 
}

const StoryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyText, language } = location.state as LocationState; 

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
      
      pdf.save(language === 'en' ? 'Custom_Story.pdf' : 'Historia_Personalizada.pdf');
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
        {language === 'en' ? 'Download as PDF' : 'Descargar como PDF'}
      </button>
      
      <h1>{language === 'en' ? 'Here is your Story!' : '¡Aqui esta tu Historia!'}</h1>
      <div id="story-content" className="story-content">
        <p>{storyText}</p>
      </div>
      
      <div className="narration-controls">
        <button onClick={speakStory} className="play-narration-button">
          {language === 'en' ? 'Play Narration' : 'Reproducir Narración'}
        </button>
        <button onClick={stopNarration} className="stop-narration-button">
          {language === 'en' ? 'Stop Narration' : 'Detener Narración'}
        </button>
      </div>
      <button onClick={handleBackToForm} className="back-to-form-button">
        {language === 'en' ? "Let's Create Another Story!" : '¡Crea Otra Historia!'}
      </button>
    </div>
  );
};

export default StoryPage;
