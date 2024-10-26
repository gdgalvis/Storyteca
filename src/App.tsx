import React from 'react';
import './App.css'; 
import Title from './components/Title';
import Form from './components/Form';
import ImageContainer from './components/ImageContainer';

const App: React.FC = () => {
  return (
    <div className="container">
      <Title />
      <div className="content">
        <div className="form-container">
          <Form />
        </div>
        <div className="image-container">
          <ImageContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
