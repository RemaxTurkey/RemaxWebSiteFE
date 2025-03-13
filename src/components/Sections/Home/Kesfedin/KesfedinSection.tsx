"use client";
import React, { useState, useRef, useEffect } from 'react';
import PropertyCardMini from '@/components/PropertyCardMini/PropertyCardMini';
import './KesfedinSection.scss';
import property1 from '../../../../../public/images/property1.webp';
import property2 from '../../../../../public/images/property2.jpg';
import property3 from '../../../../../public/images/property3.webp';

// Sample property data
const properties = [
  {
    id: 1,
    images: [
      property1.src,
      property2.src,
      property3.src,
    ],
    title: 'Gürsel Mahallesi&apos;nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: '3+1',
      totalM2: '120m²',
      shareCount: 5,
      isFavorite: false,
    }
  },
  {
    id: 2,
    images: [
      property2.src,
      property3.src,
      property1.src,
    ],
    title: 'Gürsel Mahallesi&apos;nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: '2+1',
      totalM2: '95m²',
      shareCount: 3,
      isFavorite: true,
    }
  },
  {
    id: 3,
    images: [
      property3.src,
      property1.src,
      property2.src,
    ],
    title: 'Gürsel Mahallesi&apos;nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: '4+1',
      totalM2: '150m²',
      shareCount: 7,
      isFavorite: false,
    }
  },
  {
    id: 4,
    images: [
      property1.src,
      property3.src,
      property2.src,
    ],
    title: 'Gürsel Mahallesi&apos;nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: '3+1',
      totalM2: '110m²',
      shareCount: 2,
      isFavorite: false,
    }
  },
  {
    id: 5,
    images: [
      property2.src,
      property1.src,
      property3.src,
    ],
    title: 'Gürsel Mahallesi&apos;nde Metrobüse ve Herşeye yakın, benzersiz Satılık Çatı katı',
    location: 'İstanbul Avrupa / Kağıthane / Gürsel Mah.',
    price: 8900000,
    originalPrice: 9900000,
    isDiscounted: true,
    detail: {
      status: 'Satılık',
      roomCount: '2+1',
      totalM2: '85m²',
      shareCount: 4,
      isFavorite: false,
    }
  },
];

const KesfedinSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'indirimli' | 'kacirilmis'>('indirimli');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Constants for card layout
  const CARD_WIDTH = 344; // Fixed card width in pixels
  const CARD_GAP = 44;   // Gap between cards in pixels

  // Calculate how many cards can fit in the container and total slides
  useEffect(() => {
    const calculateVisibleCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        
        // Calculate how many complete cards can fit in the container
        const cardsPerView = Math.floor((containerWidth) / (CARD_WIDTH + CARD_GAP));
        
        // Set the slider width to exactly fit the visible cards
        const newSliderWidth = cardsPerView * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
        setSliderWidth(newSliderWidth);
        
        setVisibleCards(Math.max(1, cardsPerView));
      }
    };

    calculateVisibleCards();
    
    // Recalculate on window resize
    const handleResize = () => {
      calculateVisibleCards();
      // Reset to first slide when resizing to avoid showing partial cards
      setCurrentSlide(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update total slides when visible cards change
  useEffect(() => {
    // Calculate total number of slides
    const maxSlide = Math.max(0, properties.length - visibleCards);
    setTotalSlides(maxSlide);
    
    // Ensure current slide is not beyond the new maximum
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [visibleCards, properties.length, currentSlide]);

  const handleTabChange = (tab: 'indirimli' | 'kacirilmis') => {
    setActiveTab(tab);
    setCurrentSlide(0); // Reset to first slide when changing tabs
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="kesfedin-section">
      <div className="kesfedin-section__container" ref={containerRef}>
        <div className="kesfedin-section__header">
          <div className="kesfedin-section__title">
            <h2>Türkiye&apos;nin En Geniş</h2>
            <h1>Portföyünü Keşfedin.</h1>
          </div>
          <div className="kesfedin-section__tabs">
            <button 
              className={`kesfedin-section__tab ${activeTab === 'indirimli' ? 'kesfedin-section__tab--active' : ''}`}
              onClick={() => handleTabChange('indirimli')}
            >
              İndirimli Fırsatlar
            </button>
            <button 
              className={`kesfedin-section__tab ${activeTab === 'kacirilmis' ? 'kesfedin-section__tab--active' : ''}`}
              onClick={() => handleTabChange('kacirilmis')}
            >
              Kaçırdığınız Fırsatlar
            </button>
          </div>
        </div>

        <div 
          className="kesfedin-section__slider-container"
          style={{ 
            maxWidth: sliderWidth > 0 ? `${sliderWidth}px` : '100%'
          }}
        >
          <div 
            className="kesfedin-section__slider" 
            ref={sliderRef}
            style={{ 
              transform: `translateX(-${currentSlide * (CARD_WIDTH + CARD_GAP)}px)`
            }}
          >
            {properties.map((property) => (
              <div key={property.id} className="kesfedin-section__slide">
                <PropertyCardMini 
                  images={property.images}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  originalPrice={property.originalPrice}
                  isDiscounted={property.isDiscounted}
                  detail={property.detail}
                />
              </div>
            ))}
          </div>

          <div className="kesfedin-section__navigation-wrapper">
            {/* View All Button on the left */}
            <button className="kesfedin-section__view-all-button">
              Tümünü Görüntüle
            </button>
            
            {/* Dots in the center */}
            <div className="kesfedin-section__dots">
              {Array.from({ length: totalSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`kesfedin-section__dot ${index === currentSlide ? 'kesfedin-section__dot--active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation buttons on the right */}
            <div className="kesfedin-section__navigation">
              <button 
                className="kesfedin-section__nav-button kesfedin-section__nav-button--prev"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <button 
                className="kesfedin-section__nav-button kesfedin-section__nav-button--next"
                onClick={handleNextSlide}
                disabled={currentSlide >= totalSlides}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KesfedinSection;