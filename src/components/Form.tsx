import React, { useState } from 'react';
import '../App.css';

interface FormData {
  name: string;
  gender: string;
  favoriteGenre: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    favoriteGenre: ''
  });

  const [formArray, setFormArray] = useState<FormData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormArray([...formArray, formData]);
    setFormData({ name: '', gender: '', favoriteGenre: '' });
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Favorite Story Genre:</label>
          <input type="text" name="favoriteGenre" value={formData.favoriteGenre} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
