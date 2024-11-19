import React from 'react';

interface ImageContainerProps {
  currentImage: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ currentImage }) => {
  return (
    <div className="image-container">
      <img src={currentImage} alt="Question related visual" />
    </div>
  );
};

export default ImageContainer;
