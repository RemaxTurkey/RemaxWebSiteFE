import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
interface Category {
  id: string;
  label: string;
  href: string;
}

interface FastCategoriesProps {
  categories?: Category[];
}

function FastCategories({ categories }: FastCategoriesProps) {
  const t = useTranslations();
  // Default kategori verileri
  const defaultCategories: Category[] = [
    { id: 'konut', label: 'Konutlar', href: '/konut' },
    { id: 'luks', label: 'Lüks Konutlar', href: '/luks-konutlar' },
    { id: 'ticari', label: 'Ticari Gayrimenkuller', href: '/ticari' },
    { id: 'arsa', label: 'Arsa ve Arazi', href: '/arsa-arazi' },
  ];

  // Props'tan gelen kategorileri veya varsayılan kategorileri kullan
  const displayCategories = categories || defaultCategories;

  return (
    <div className="fast-categories">
      <div className="fast-categories__label">
        {t("home.fastcategory.title")}
      </div>
      <div className="fast-categories__items">
        {displayCategories.map((category) => (
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