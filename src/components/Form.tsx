import React, { useState } from 'react';
import ColorWheel from './ColorWheel';

interface FormProps {
  currentQuestionIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
  onSubmit: (formData: FormData) => void;
  language: 'en' | 'es'; // Recibir el idioma como prop
}

interface FormData {
  name: string;
  age?: number;
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

// Definir las preguntas en ambos idiomas
const questions = {
  en: [
    { label: 'What is your name?', type: 'text', name: 'name' },
    { label: 'How old is the reader?', type: 'number', name: 'age' },
    { label: 'What kind of story do you like the most?', type: 'select', name: 'storyType', options: [{ value: 'adventure', text: 'Adventure' }, { value: 'fairy_tale', text: 'Fairy Tale' }, { value: 'mystery', text: 'Mystery' }, { value: 'funny_story', text: 'Funny Story' }, { value: 'animal_story', text: 'Animal Story' }, { value: 'space_adventure', text: 'Space Adventure' }] },
    { label: 'Who would you like to be in the story?', type: 'select', name: 'role', options: [{ value: 'hero', text: 'Hero' }, { value: 'explorer', text: 'Explorer' }, { value: 'wizard', text: 'Wizard' }, { value: 'detective', text: 'Detective' }, { value: 'animal', text: 'Animal' }, { value: 'space_traveler', text: 'Space Traveler' }] },
    { label: 'What kind of special friend or companion would you like to have in the story?', type: 'select', name: 'companion', options: [{ value: 'magical_creature', text: 'Magical Creature' }, { value: 'talking_animal', text: 'Talking Animal' }, { value: 'robot', text: 'Robot' }, { value: 'imaginary_friend', text: 'Imaginary Friend' }] },
    { label: 'Where would you like the story to take place?', type: 'select', name: 'setting', options: [{ value: 'enchanted_forest', text: 'Enchanted Forest' }, { value: 'outer_space', text: 'Outer Space' }, { value: 'underwater_world', text: 'Underwater World' }, { value: 'magical_castle', text: 'Magical Castle' }, { value: 'pirate_ship', text: 'Pirate Ship' }, { value: 'farm', text: 'Farm' }] },
    { label: 'What’s a special item or power you’d like to have?', type: 'select', name: 'specialItemOrPower', options: [{ value: 'magic_wand', text: 'Magic Wand' }, { value: 'invisibility_cloak', text: 'Invisibility Cloak' }, { value: 'flying_boots', text: 'Flying Boots' }, { value: 'time_travel_watch', text: 'Time Travel Watch' }, { value: 'super_strength_potion', text: 'Super Strength Potion' }] },
    { label: 'What kind of challenge or problem would you like to solve in the story?', type: 'select', name: 'challenge', options: [{ value: 'hidden_treasure', text: 'Find a Hidden Treasure' }, { value: 'save_friend', text: 'Save a Friend' }, { value: 'solve_mystery', text: 'Solve a Mystery' }, { value: 'escape_maze', text: 'Escape a Tricky Maze' }, { value: 'rescue_creature', text: 'Rescue a Magical Creature' }] },
    { label: 'What’s your favorite animal or creature?', type: 'select', name: 'favoriteAnimal', options: [{ value: 'dragon', text: 'Dragon' }, { value: 'unicorn', text: 'Unicorn' }, { value: 'phoenix', text: 'Phoenix' }, { value: 'tiger', text: 'Tiger' }, { value: 'elephant', text: 'Elephant' }, { value: 'owl', text: 'Owl' }] },
    { label: 'What’s your favorite color?', type: 'colorWheel', name: 'favoriteColor' },
    { label: 'How would you like the story to end?', type: 'select', name: 'endingStyle', options: [{ value: 'happy_ending', text: 'Happy Ending' }, { value: 'surprise_twist', text: 'Surprise Twist' }, { value: 'friends', text: 'Everyone Becomes Friends' }, { value: 'special_discovery', text: 'Finding Something Special' }] },
  ],
  es: [
    { label: '¿Cuál es tu nombre?', type: 'text', name: 'name' },
    { label: '¿Cuál es la edad del lector?', type: 'number', name: 'age' },
    { label: '¿Qué tipo de historia te gusta más?', type: 'select', name: 'storyType', options: [{ value: 'adventure', text: 'Aventura' }, { value: 'fairy_tale', text: 'Cuento de Hadas' }, { value: 'mystery', text: 'Misterio' }, { value: 'funny_story', text: 'Historia Divertida' }, { value: 'animal_story', text: 'Historia de Animales' }, { value: 'space_adventure', text: 'Aventura Espacial' }] },
    { label: '¿Quién te gustaría ser en la historia?', type: 'select', name: 'role', options: [{ value: 'hero', text: 'Héroe' }, { value: 'explorer', text: 'Explorador' }, { value: 'wizard', text: 'Mago' }, { value: 'detective', text: 'Detective' }, { value: 'animal', text: 'Animal' }, { value: 'space_traveler', text: 'Viajero Espacial' }] },
    { label: '¿Qué tipo de amigo o compañero especial te gustaría tener en la historia?', type: 'select', name: 'companion', options: [{ value: 'magical_creature', text: 'Criatura Mágica' }, { value: 'talking_animal', text: 'Animal que Habla' }, { value: 'robot', text: 'Robot' }, { value: 'imaginary_friend', text: 'Amigo Imaginario' }] },
    { label: '¿Dónde te gustaría que se desarrollara la historia?', type: 'select', name: 'setting', options: [{ value: 'enchanted_forest', text: 'Bosque Encantado' }, { value: 'outer_space', text: 'Espacio Exterior' }, { value: 'underwater_world', text: 'Mundo Submarino' }, { value: 'magical_castle', text: 'Castillo Mágico' }, { value: 'pirate_ship', text: 'Barco Pirata' }, { value: 'farm', text: 'Granja' }] },
    { label: '¿Qué objeto o poder especial te gustaría tener?', type: 'select', name: 'specialItemOrPower', options: [{ value: 'magic_wand', text: 'Varita Mágica' }, { value: 'invisibility_cloak', text: 'Capa de Invisibilidad' }, { value: 'flying_boots', text: 'Botas Voladoras' }, { value: 'time_travel_watch', text: 'Reloj de Viaje en el Tiempo' }, { value: 'super_strength_potion', text: 'Poción de Súper Fuerza' }] },
    { label: '¿Qué tipo de desafío o problema te gustaría resolver en la historia?', type: 'select', name: 'challenge', options: [{ value: 'hidden_treasure', text: 'Encontrar un Tesoro Escondido' }, { value: 'save_friend', text: 'Salvar a un Amigo' }, { value: 'solve_mystery', text: 'Resolver un Misterio' }, { value: 'escape_maze', text: 'Escapar de un Laberinto' }, { value: 'rescue_creature', text: 'Rescatar a una Criatura Mágica' }] },
    { label: '¿Cuál es tu animal o criatura favorita?', type: 'select', name: 'favoriteAnimal', options: [{ value: 'dragon', text: 'Dragón' }, { value: 'unicorn', text: 'Unicornio' }, { value: 'phoenix', text: 'Fénix' }, { value: 'tiger', text: 'Tigre' }, { value: 'elephant', text: 'Elefante' }, { value: 'owl', text: 'Búho' }] },
    { label: '¿Cuál es tu color favorito?', type: 'colorWheel', name: 'favoriteColor' },
    { label: '¿Cómo te gustaría que terminara la historia?', type: 'select', name: 'endingStyle', options: [{ value: 'happy_ending', text: 'Final Feliz' }, { value: 'surprise_twist', text: 'Giro Sorpresivo' }, { value: 'friends', text: 'Todos se Hacen Amigos' }, { value: 'special_discovery', text: 'Encontrando Algo Especial' }] },
  ],
};

const Form: React.FC<FormProps> = ({ currentQuestionIndex, handleNext, handlePrevious, onSubmit, language }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: undefined,
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
    const question = questions[language][currentQuestionIndex];
    const answer = formData[question.name as keyof FormData];

    // Validar que la pregunta actual tenga una respuesta
    if (!answer) {
      alert(`Por favor, responde la pregunta: "${question.label}"`);
      return;
    }

    handleNext();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestionIndex === questions[language].length - 1) {
      onSubmit(formData);
    } else {
      handleNextWithValidation();
    }
  };

  const renderQuestion = () => {
    const question = questions[language][currentQuestionIndex];
    const value = formData[question.name as keyof FormData] || '';

    if (question.type === 'colorWheel') {
      return <ColorWheel onColorSelect={handleColorSelect} language={language} />;
    }

    if (question.type === 'select' && question.options) {
      return (
        <select name={question.name} value={value as string} onChange={handleChange} required>
          <option value="">Seleccione...</option>
          {question.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
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
          max="13"
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
          <label>{questions[language][currentQuestionIndex].label}</label>
          {renderQuestion()}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {currentQuestionIndex > 0 && (
            <button type="button" onClick={handlePrevious}>
              {language === 'es' ? '← Atrás' : '← Back'}
            </button>
          )}
          {currentQuestionIndex < questions[language].length - 1 ? (
            <button type="button" onClick={handleNextWithValidation}>
              {language === 'es' ? 'Siguiente →' : 'Next →'}
            </button>
          ) : (
            <button type="submit" >
              {language === 'es' ? 'Enviar' : 'Submit'}
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default Form;