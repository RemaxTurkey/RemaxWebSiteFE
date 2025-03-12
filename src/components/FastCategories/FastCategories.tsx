import React from 'react';
import Link from 'next/link';

function FastCategories() {
  // Category data
  const categories = [
    { id: 'konut', label: 'Konutlar', href: '/konut' },
    { id: 'isyeri', label: 'Lüks Konutlar', href: '/is-yeri' },
    { id: 'arsa', label: 'Ticari Gayrimenkuller', href: '/arsa-arazi' },
    { id: 'bina', label: 'Arsa ve Arazi', href: '/bina' },
  ];

  return (
      <div className="fast-categories">
        <div className="fast-categories__label">
          Hızlı Kategori
        </div>
        <div className="fast-categories__items">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className="fast-categories__item"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
  );
}

export default FastCategories;