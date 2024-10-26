import React from 'react';
import '../App.css'; 
import reactImage from '../assets/react.svg';

const ImageContainer: React.FC = () => {
  return (
    <div className="image-container">
      <img
        src={reactImage}
        alt="React Logo"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ImageContainer;
