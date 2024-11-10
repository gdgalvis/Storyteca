import React, { useState } from 'react';
import ColorWheel from './ColorWheel';  

interface FormProps {
  currentQuestionIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  onSubmit: (formData: FormData) => void;  
}

interface FormData {
  name: string;
  age: number;
  storyType: string;
  role: string;
  companion: string;
  setting: string;
  specialItemOrPower: string;
  challenge: string;
  favoriteAnimal: string;
  favoriteColor: string;
  endingStyle: string;
}

const questions = [
  { label: 'What is your name?', type: 'text', name: 'name' },
  { label: 'How old are you?', type: 'number', name: 'age' },
  { label: 'What kind of story do you like the most?', type: 'select', name: 'storyType', options: ['Adventure', 'Fairy Tale', 'Mystery', 'Funny Story', 'Animal Story', 'Space Adventure'] },
  { label: 'Who would you like to be in the story?', type: 'select', name: 'role', options: ['Hero', 'Explorer', 'Wizard', 'Detective', 'Animal', 'Space Traveler'] },
  { label: 'Would you like any special friends or companions in the story?', type: 'select', name: 'companion', options: ['Magical Creature', 'Talking Animal', 'Robot', 'Imaginary Friend'] },
  { label: 'Where would you like the story to take place?', type: 'select', name: 'setting', options: ['Enchanted Forest', 'Outer Space', 'Underwater World', 'Magical Castle', 'Pirate Ship', 'Farm'] },
  { label: 'What’s a special item or power you’d like to have?', type: 'select', name: 'specialItemOrPower', options: ['Magic Wand', 'Invisibility Cloak', 'Flying Boots', 'Time Travel Watch', 'Super Strength Potion'] },
  { label: 'What kind of challenge or problem would you like to solve in the story?', type: 'select', name: 'challenge', options: ['Find a Hidden Treasure', 'Save a Friend', 'Solve a Mystery', 'Escape a Tricky Maze', 'Rescue a Magical Creature'] },
  { label: 'What’s your favorite animal or creature?', type: 'select', name: 'favoriteAnimal', options: ['Dragon', 'Unicorn', 'Phoenix', 'Tiger', 'Elephant', 'Owl'] },
  { label: 'What’s your favorite color?', type: 'colorWheel', name: 'favoriteColor' },
  { label: 'How would you like the story to end?', type: 'select', name: 'endingStyle', options: ['Happy Ending', 'Surprise Twist', 'Everyone Becomes Friends', 'Finding Something Special'] },
];

const Form: React.FC<FormProps> = ({ currentQuestionIndex, handleNext, handlePrevious, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 7,
    storyType: '',
    role: '',
    companion: '',
    setting: '',
    specialItemOrPower: '',
    challenge: '',
    favoriteAnimal: '',
    favoriteColor: '',
    endingStyle: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleColorSelect = (color: string) => {
    setFormData({
      ...formData,
      favoriteColor: color
    });
  };

  const handleNextWithValidation = () => {
    const question = questions[currentQuestionIndex];
    const answer = formData[question.name as keyof FormData];

    // Validate that the current question has an answer
    if (!answer) {
      alert(`Please answer the question: "${question.label}"`);
      return;
    }

    handleNext();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestionIndex === questions.length - 1) {
      onSubmit(formData); 
    } else {
      handleNextWithValidation();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    const value = formData[question.name as keyof FormData] || '';

    if (question.type === 'colorWheel') {
      return <ColorWheel onColorSelect={handleColorSelect} />;
    }

    if (question.type === 'select' && question.options) {
      return (
        <select name={question.name} value={value as string} onChange={handleChange} required>
          <option value="">Select...</option>
          {question.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (question.type === 'text') {
      return (
        <input
          type="text"
          name={question.name}
          value={value as string}
          onChange={handleChange}
          required
        />
      );
    }

    if (question.type === 'number') {
      return (
        <input
          type="number"
          name={question.name}
          value={value as number}
          onChange={handleChange}
          min="5"
          max="12"
          required
        />
      );
    }

    return null;
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <div>
          <label>{questions[currentQuestionIndex].label}</label>
          {renderQuestion()}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {currentQuestionIndex > 0 && (
            <button type="button" onClick={handlePrevious}>
              ← Back
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" onClick={handleNextWithValidation}>
              Next →
            </button>
          ) : (
            <button type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
