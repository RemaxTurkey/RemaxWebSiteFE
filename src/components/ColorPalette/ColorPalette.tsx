'use client';

import React, { useEffect, useState } from 'react';
import './ColorPalette.scss';

interface ColorItem {
  name: string;
  class: string;
  variable: string;
}

const ColorPalette: React.FC = () => {
  const [colorValues, setColorValues] = useState<Record<string, string>>({});

  const colorItems: ColorItem[] = [
    { name: 'Ana Renk', class: 'primary', variable: '--primary-color' },
    { name: 'İkincil Renk', class: 'secondary', variable: '--secondary-color' },
    { name: 'Başarılı', class: 'success', variable: '--success-color' },
    { name: 'Tehlike', class: 'danger', variable: '--danger-color' },
    { name: 'Uyarı', class: 'warning', variable: '--warning-color' },
    { name: 'Bilgi', class: 'info', variable: '--info-color' },
    { name: 'Açık', class: 'light', variable: '--light-color' },
    { name: 'Koyu', class: 'dark', variable: '--dark-color' },
  ];

  useEffect(() => {
    const computedColors: Record<string, string> = {};
    colorItems.forEach(item => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(item.variable).trim();
      computedColors[item.variable] = color;
    });
    setColorValues(computedColors);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="color-palette">
      <h2 className="text-dark mb-4">Renk Paleti</h2>
      <div className="color-grid">
        {colorItems.map((color) => (
          <div key={color.class} className="color-item">
            <div 
              className={`color-preview bg-${color.class} hover-${color.class}`}
              onClick={() => copyToClipboard(colorValues[color.variable] || '')}
              title="Renk kodunu kopyalamak için tıklayın"
            />
            <div className="color-info">
              <span className={`color-name text-${color.class}`}>{color.name}</span>
              <span className="color-code">{colorValues[color.variable]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
