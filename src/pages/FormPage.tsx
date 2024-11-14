import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import ImageContainer from '../components/ImageContainer';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import image7 from '../assets/image7.png';
import image8 from '../assets/image8.png';
import image9 from '../assets/image9.png';
import image10 from '../assets/image10.png';
import image11 from '../assets/image11.png';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

const FormPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/openai';

  const handleNext = () => {
    if (currentQuestionIndex < images.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'es' : 'en'));
  };

  const generatePromptForLLM = async (formData: any) => {
    let prompt = `Create a children's story based on the following details:
      
      - Name: ${formData.name}
      - Age: ${formData.age}
      - Story Type: ${formData.storyType}
      - Role in the story: ${formData.role}
      - Companion: ${formData.companion}
      - Setting: ${formData.setting}
      - Special Item or Power: ${formData.specialItemOrPower}
      - Challenge: ${formData.challenge}
      - Favorite Animal: ${formData.favoriteAnimal}
      - Favorite Color: ${formData.favoriteColor}
      - Desired Ending: ${formData.endingStyle}
      
      Craft a fun and engaging story for a young child based on these preferences.`;

    if (language === 'es') {
      prompt = `Crea una historia para niños basada en los siguientes detalles:
        
        - Nombre: ${formData.name}
        - Edad: ${formData.age}
        - Tipo de historia: ${formData.storyType}
        - Rol en la historia: ${formData.role}
        - Compañero: ${formData.companion}
        - Escenario: ${formData.setting}
        - Objeto especial o poder: ${formData.specialItemOrPower}
        - Desafío: ${formData.challenge}
        - Animal favorito: ${formData.favoriteAnimal}
        - Color favorito: ${formData.favoriteColor}
        - Final deseado: ${formData.endingStyle}
        
        Crea una historia divertida y atractiva para un niño pequeño basada en estas preferencias.`;
    }

    return prompt;
  };

  const handleFormSubmit = async (formData: any) => {
    const storyPrompt = await generatePromptForLLM(formData);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: storyPrompt }),
      });
      const data = await response.json();
      const storyText = data.choices?.[0]?.message?.content || 'Error: Unable to generate story.';
      navigate('/story', { state: { storyText } });
  
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <div className="content">
      <button
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
        onClick={handleLanguageToggle}
      >
        {language === 'en' ? 'Español' : 'English'}
      </button>

      <div className="form-container">
        <Form
          currentQuestionIndex={currentQuestionIndex}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          onSubmit={handleFormSubmit}
          language={language}
        />
      </div>

      <div className="image-container">
        <ImageContainer currentImage={images[currentQuestionIndex]} />
      </div>
    </div>
  );
};

export default FormPage;
