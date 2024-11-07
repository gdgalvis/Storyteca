import React from 'react';

interface ImageContainerProps {
  currentImage: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ currentImage }) => {
  return (
    <div>
      <img
        src={currentImage}
        alt="Question related visual"
        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
      />
    </div>
  );
};

export default ImageContainer;
