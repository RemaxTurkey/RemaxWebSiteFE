"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import './MobileNavbar.scss';
import Image from 'next/image';
import { Menu, X, User, Globe } from 'lucide-react';

const MobileNavbar: React.FC = () => {
  const t = useTranslations('navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Menü açıldığında body scroll'u engelle
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Sayfa değiştiğinde menüyü kapat
  const handleNavigation = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="mobile-navbar">
      <div className="mobile-navbar__container">
        {/* Logo */}
        <div className="mobile-navbar__logo">
          <Link href="/" aria-label={t('home-page')} onClick={handleNavigation}>
            <Image 
              src="/logo.svg" 
              alt="Remax Logo" 
              width={110} 
              height={35} 
              priority
            />
          </Link>
        </div>

        {/* Menü Butonu */}
        <button 
          className="mobile-navbar__toggle" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t('close-menu') : t('open-menu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil Menü */}
      <div className={`mobile-navbar__menu ${isMenuOpen ? 'mobile-navbar__menu--open' : ''}`}>
        <div className="mobile-navbar__menu-header">
          <Image 
            src="/logo.svg" 
            alt="Remax Logo" 
            width={110} 
            height={35} 
            priority
          />
          <button 
            className="mobile-navbar__close" 
            onClick={toggleMenu}
            aria-label={t('close-menu')}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-navbar__nav">
          <ul className="mobile-navbar__nav-list">
            <li className="mobile-navbar__nav-item">
              <Link 
                href="/consultant" 
                className="mobile-navbar__nav-link"
                onClick={handleNavigation}
              >
                {t('become-consultant')}
              </Link>
            </li>
            <li className="mobile-navbar__nav-item">
              <Link 
                href="/consultants" 
                className="mobile-navbar__nav-link"
                onClick={handleNavigation}
              >
                {t('our-consultants')}
              </Link>
            </li>
            <li className="mobile-navbar__nav-item">
              <Link 
                href="/open-office" 
                className="mobile-navbar__nav-link"
                onClick={handleNavigation}
              >
                {t('open-office')}
              </Link>
            </li>
            <li className="mobile-navbar__nav-item">
              <Link 
                href="/offices" 
                className="mobile-navbar__nav-link"
                onClick={handleNavigation}
              >
                {t('our-offices')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mobile-navbar__actions">
          <div className="mobile-navbar__language">
            <button className="mobile-navbar__language-btn">
              <Globe size={20} />
              <span>EN</span>
            </button>
          </div>
          <Link 
            href="/login" 
            className="mobile-navbar__login-btn"
            onClick={handleNavigation}
          >
            {t('login')}
            <User size={18} />
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="mobile-navbar__overlay" onClick={toggleMenu} />
      )}
    </div>
  );
};

export default MobileNavbar; 