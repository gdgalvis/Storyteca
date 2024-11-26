import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import ImageContainer from '../components/ImageContainer';
import Spinner from '../components/Spinner';

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
  const [loading, setLoading] = useState(false);
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
    let prompt = `Create an imaginative and engaging children's story tailored for a primary school child based on the following details: 

      - Child's Name: ${formData.name}
      - Age: ${formData.age}
      - Type of Story (e.g., adventure, mystery, fantasy): ${formData.storyType}
      - Child's Role in the Story (e.g., hero, explorer, problem-solver): ${formData.role}
      - Companion Character (e.g., a talking dog, a magical friend): ${formData.companion}
      - Setting of the Story (e.g., a jungle, a magical castle, the ocean): ${formData.setting}
      - Special Item or Magical Power: ${formData.specialItemOrPower}
      - Main Challenge or Problem to Solve: ${formData.challenge}
      - Favorite Animal (to include in the story, maybe as a sidekick): ${formData.favoriteAnimal}
      - Favorite Color (to influence descriptions or themes): ${formData.favoriteColor}
      - Desired Ending Style (e.g., happy, surprising, heartwarming): ${formData.endingStyle}

Please write a fun, age-appropriate story for a young child that incorporates these details creatively. Use language and themes suitable for a primary education level and ensure the story is engaging and easy to follow.`;

    if (language === 'es') {
      prompt = `Crea en español una historia imaginativa y divertida para niños, adaptada a un niño de educación primaria, basada en los siguientes detalles: 

      - Nombre del niño: ${formData.name}
      - Edad: ${formData.age}
      - Tipo de historia (por ejemplo, aventura, misterio, fantasía): ${formData.storyType}
      - Rol del niño en la historia (por ejemplo, héroe, explorador, solucionador de problemas): ${formData.role}
      - Compañero del personaje (por ejemplo, un perro que habla, un amigo mágico): ${formData.companion}
      - Escenario de la historia (por ejemplo, una jungla, un castillo mágico, el océano): ${formData.setting}
      - Objeto especial o poder mágico: ${formData.specialItemOrPower}
      - Principal desafío o problema a resolver: ${formData.challenge}
      - Animal favorito (para incluir en la historia): ${formData.favoriteAnimal}
      - Color favorito (para influir en descripciones o temas): ${formData.favoriteColor}
      - Tipo de final deseado (por ejemplo, feliz, sorprendente, conmovedor): ${formData.endingStyle}

Por favor, escribe una historia divertida y adecuada para la edad de un niño pequeño que incorpore estos detalles de manera creativa. Usa un lenguaje sencillo y temas apropiados para niños de educación primaria, asegurándote de que la historia sea atractiva y fácil de seguir.`;
    }

    return prompt;
  };

  const handleFormSubmit = async (formData: any) => {
    const storyPrompt = await generatePromptForLLM(formData);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: currentQuestionIndex === 0 ? '#007bff' : '#aaa',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: currentQuestionIndex === 0 ? 'pointer' : 'not-allowed',
        }}
        onClick={currentQuestionIndex === 0 ? handleLanguageToggle : undefined}
        disabled={currentQuestionIndex !== 0}
      >
        {language === 'en' ? 'Español' : 'English'}
      </button>

      {loading && (
        <div className="loading-overlay">
          <Spinner />
        </div>
      )}

      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default FormPage;
