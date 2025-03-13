"use client"
import React from 'react';
import './FastCategoriesMobile.scss';
import { ChevronRight } from 'lucide-react';

interface FastCategoriesMobileProps {
  categories: {
    id: string;
    label: string;
    propertyCount: string;
  }[];
}

const FastCategoriesMobile = ({ categories }: FastCategoriesMobileProps) => {
  return (
    <div className="fast-categories-mobile">
      {categories.map((category) => (
        <div key={category.id} className="fast-categories-mobile__item">
          <div className="fast-categories-mobile__content">
            <h3 className="fast-categories-mobile__title">{category.label}</h3>
            <p className="fast-categories-mobile__count">{category.propertyCount} hazır portföy</p>
          </div>
          <div className="fast-categories-mobile__icon">
            <ChevronRight size={24} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default FastCategoriesMobile