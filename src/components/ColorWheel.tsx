import React, { useState } from 'react';

interface ColorWheelProps {
  onColorSelect: (color: string) => void;
  language: 'en' | 'es';
}

const colors = {
  en: [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Brown', hex: '#8B4513' },
  ],
  es: [
    { name: 'Rojo', hex: '#FF0000' },
    { name: 'Azul', hex: '#0000FF' },
    { name: 'Verde', hex: '#00FF00' },
    { name: 'Amarillo', hex: '#FFFF00' },
    { name: 'Morado', hex: '#800080' },
    { name: 'Rosa', hex: '#FFC0CB' },
    { name: 'Naranja', hex: '#FFA500' },
    { name: 'Marrón', hex: '#8B4513' },
  ]
};

const ColorWheel: React.FC<ColorWheelProps> = ({ onColorSelect, language }) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName);
    onColorSelect(colorName);
  };

  const hoverText = language === 'en' ? 'Select a color' : 'Seleccione un color';

  const colorList = colors[language];

  return (
    <div className="color-wheel">
      <div className="color-preview">{hoveredColor || selectedColor || hoverText}</div>
      <div className="color-options">
        {colorList.map((color) => (
          <div
            key={color.name}
            className={`color-swatch ${selectedColor === color.name ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
            onMouseEnter={() => setHoveredColor(color.name)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={() => handleColorClick(color.name)}
            title={color.name}
          >
            {selectedColor === color.name && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorWheel;