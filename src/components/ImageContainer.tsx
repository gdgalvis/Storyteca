import React, { useState, useEffect } from 'react';

interface ImageContainerProps {
  currentImage: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ currentImage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);


    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100); 

    return () => clearTimeout(timeout);
  }, [currentImage]);

  return (
    <div className={`image-container ${visible ? 'fade-in' : 'fade-out'}`}>
      <img src={currentImage} alt="Question related visual" />
    </div>
  );
};

export default ImageContainer;
