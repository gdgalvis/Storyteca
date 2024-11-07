import React, { useState } from 'react';
import './App.css'; 
import Title from './components/Title';
import Form from './components/Form';
import ImageContainer from './components/ImageContainer';

// Import all images
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.png';
import image5 from './assets/image5.png';
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';
import image9 from './assets/image9.png';
import image10 from './assets/image10.png';
import image11 from './assets/image11.png';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  return (
    <div className="container">
      <Title />
      <div className="content">
        <div className="form-container">
          <Form
            currentQuestionIndex={currentQuestionIndex}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
        <div className="image-container">
          <ImageContainer currentImage={images[currentQuestionIndex]} />
        </div>
      </div>
    </div>
  );
};

export default App;

