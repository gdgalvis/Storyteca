// src/pages/FormPage.tsx
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
    const navigate = useNavigate();
  
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
  
    const generatePromptForLLM = (formData: any) => {
      return `Create a children's story based on the following details:
      
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
    };
  
    const handleFormSubmit = (formData: any) => {
      const storyPrompt = generatePromptForLLM(formData);
      navigate('/story', { state: { storyText: storyPrompt } });  // Navigate to Story page with story prompt
    };
  
    return (
      <div className="content">
        <div className="form-container">
          <Form
            currentQuestionIndex={currentQuestionIndex}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            onSubmit={handleFormSubmit}  // Pass handleFormSubmit to Form component
          />
        </div>
        <div className="image-container">
          <ImageContainer currentImage={images[currentQuestionIndex]} />
        </div>
      </div>
    );
  };
  
  export default FormPage;