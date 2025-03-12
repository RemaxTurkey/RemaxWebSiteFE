"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/_property_card_mini.scss";
import { formatPriceToTurkishLira } from "@/lib/utils";
import Image from "next/image";

interface PropertyCardMiniProps {
  images: string[];
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  isDiscounted?: boolean;
  autoplayInterval?: number; // Time in ms between auto slides
  detail: {
    status: string;
    roomCount: string;
    totalM2: string;
    shareCount: number;
    isFavorite: boolean;
  };
}

const PropertyCardMini: React.FC<PropertyCardMiniProps> = ({
  images,
  title,
  location,
  price,
  originalPrice,
  isDiscounted = false,
  autoplayInterval = 5000, // Default to 5 seconds
  detail,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "prev" | null
  >(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFavorite, setIsFavorite] = useState(detail.isFavorite);

  // Handle automatic slideshow
  useEffect(() => {
    if (!isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        setPrevImageIndex(currentImageIndex);
        setTransitionDirection("next");
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoplayInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [images.length, autoplayInterval, isPaused, currentImageIndex]);

  // Pause slideshow on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Navigation functions
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrevImageIndex(currentImageIndex);
    setTransitionDirection("prev");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrevImageIndex(currentImageIndex);
    setTransitionDirection("next");
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentImageIndex) return;

    setPrevImageIndex(currentImageIndex);
    setTransitionDirection(index > currentImageIndex ? "next" : "prev");
    setCurrentImageIndex(index);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;

      // If the swipe is significant enough (more than 50px)
      if (Math.abs(diff) > 50) {
        setPrevImageIndex(currentImageIndex);

        if (diff > 0) {
          // Swiped left, go to next
          setTransitionDirection("next");
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else {
          // Swiped right, go to previous
          setTransitionDirection("prev");
          setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          );
        }
      }
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-card-mini">
      <div
        className="property-card-mini__image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDiscounted && (
          <span className="property-card-mini__discount-badge">İndirimli!</span>
        )}

        {/* Render all images with appropriate animation classes */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`property-card-mini__image-wrapper ${
              index === currentImageIndex
                ? "property-card-mini__image-wrapper--active property-card-mini__image-wrapper--fade-in"
                : index === prevImageIndex && transitionDirection === "next"
                ? "property-card-mini__image-wrapper--fade-out-left"
                : index === prevImageIndex && transitionDirection === "prev"
                ? "property-card-mini__image-wrapper--fade-out-right"
                : ""
            }`}
          >
            <Image
              src={image}
              alt={`${title} - image ${index + 1}`}
              className="property-card-mini__image"
              width={300}
              height={300}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation buttons - always visible on mobile, visible on hover for desktop */}
        <button
          className="property-card-mini__nav-button property-card-mini__nav-button--prev"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="property-card-mini__nav-button property-card-mini__nav-button--next"
          onClick={goToNext}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="property-card-mini__dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`property-card-mini__dot ${
                index === currentImageIndex
                  ? "property-card-mini__dot--active"
                  : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="property-card-mini__content">
        <h3 className="property-card-mini__title">{title}</h3>
        <div className="property-card-mini__location">
          <span className="property-card-mini__location-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <span className="property-card-mini__location-text">{location}</span>
        </div>
        <div className="property-card-mini__mobile-details">
          <div className="property-card-mini__mobile-details-item">
            <div className="property-card-mini__mobile-details-item_status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-handshake"
              >
                <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                <path d="m21 3 1 11h-2" />
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                <path d="M3 4h8" />
              </svg>
              <span>{detail.status}</span>
            </div>
            <div className="property-card-mini__mobile-details-item_status">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-bed-double"
              >
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                <path d="M12 4v6" />
                <path d="M2 18h20" />
              </svg>
              <span>{detail.roomCount}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-proportions"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M12 9v11" />
                <path d="M2 9h13a2 2 0 0 1 2 2v9" />
              </svg>
              <span>{detail.totalM2}</span>
            </div>
          </div>
          <button className="property-card-mini__mobile-details-share">
            <div className="property-card-mini__mobile-details-share-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-share-2"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <span>{detail.shareCount}</span>
          </button>
          <button
            className="property-card-mini__mobile-details-favorite"
            onClick={handleFavoriteClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? "orange" : "none"}
              stroke={isFavorite ? "orange" : "#8698B7"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-star"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            <span>Favori</span>
          </button>
        </div>
        <div className="property-card-mini__price-container">
          <span className="property-card-mini__price">
            {formatPriceToTurkishLira(price)}
          </span>
          {isDiscounted && originalPrice && (
            <span className="property-card-mini__original-price">
              {formatPriceToTurkishLira(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCardMini;
