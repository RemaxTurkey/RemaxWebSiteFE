"use client";
import React, { useState, useRef, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useTranslations } from "@/i18n/useTranslations";
import Link from "next/link";
import { MapIcon } from "../../../public/icons/MapIcon";
import { SearchIcon } from "../../../public/icons/SearchIcon";
import { ChevronDown } from "lucide-react";
import { createPortal } from 'react-dom';

const HomeFilter = () => {
  const { t } = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState("konut");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const categories = [
    { id: "konut", label: "Konut" },
    { id: "isyeri", label: "İş Yeri" },
    { id: "arsa", label: "Arsa" },
    { id: "bina", label: "Bina" },
    { id: "devremulk", label: "Devremülk" },
  ];

  // Client-side rendering için
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Dropdown dışına tıklandığında dropdown'u kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownButtonRef.current && 
        !dropdownButtonRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.dropdown-menu-portal')
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
  };

  // Dropdown menüsünü portal ile render et
  const renderDropdownMenu = () => {
    if (!isDropdownOpen || !isMounted) return null;
    
    // Dropdown butonunun pozisyonunu al
    const buttonRect = dropdownButtonRef.current?.getBoundingClientRect();
    if (!buttonRect) return null;
    
    return createPortal(
      <div 
        className="dropdown-menu-portal"
        style={{
          position: 'fixed',
          top: `${buttonRect.bottom + window.scrollY + 5}px`,
          left: `${buttonRect.left + window.scrollX}px`,
          width: `120px`,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 9999,
          padding: '5px 0',
        }}
      >
        {categories.map((category) => (
          <div 
            key={category.id}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              backgroundColor: selectedCategory === category.id ? '#f0f0f0' : 'transparent',
              fontWeight: selectedCategory === category.id ? 500 : 400,
              color: '#333',
            }}
            onClick={() => selectCategory(category.id)}
          >
            {category.label}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <div className="home-filter">
      <div className="home-filter__filter">
        <div className="home-filter__filter-category">
          <button 
            ref={dropdownButtonRef}
            className="home-filter__filter-category-dropdown"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <span className="home-filter__filter-category-selected">
              {categories.find(cat => cat.id === selectedCategory)?.label}
            </span>
            <ChevronDown className={`home-filter__filter-category-icon ${isDropdownOpen ? 'open' : ''}`} />
          </button>
          
          {/* Portal ile render edilen dropdown menüsü */}
          {renderDropdownMenu()}
        </div>
        <div className="home-filter__filter-city-search">
          <input
            type="text"
            placeholder={t("home.filter.search-by-city-placeholder")}
            className="home-filter__filter-city-search-input"
          />
        </div>
        <div className="home-filter__filter-buttons">
          <button className="btn-search">
            <SearchIcon />
            <span className="btn-search__text">
              <FormattedMessage id="app.search" />
            </span>
          </button>
          <button className="btn-map-link">
            <Link href="/map">
              <MapIcon stroke="white" width={12} height={12} />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
