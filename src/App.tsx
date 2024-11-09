import React from 'react';
import './App.css'; 
import Title from './components/Title';
import Form from './components/Form';
import Prompt from './components/Prompt';
//import ImageContainer from './components/ImageContainer';
//<ImageContainer />
const App: React.FC = () => {
  return (
    <div className="container">
      <Title />
      <div className="content">
        <div className="form-container">
          <Form />
        </div>
        <div className="image-container">
          <Prompt/>
        </div>
      </div>
    </div>
  );
};

export default App;
