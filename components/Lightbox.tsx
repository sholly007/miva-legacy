'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  studentName,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  studentName: string;
}) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  }, [onNext, onPrev]);

  const handleSwipe = useCallback(() => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > swipeThreshold) {
      onNext();
    } else if (diff < -swipeThreshold) {
      onPrev();
    }
  }, [onNext, onPrev]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="lightbox-overlay" 
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery for ${studentName}`}
    >
      <button 
        className="lightbox-close" 
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button 
            className="lightbox-nav lightbox-nav-prev" 
            onClick={onPrev}
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            className="lightbox-nav lightbox-nav-next" 
            onClick={onNext}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div className="lightbox-image-wrapper">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery photo ${currentIndex + 1} of ${studentName} (full size)`} 
        />
      </div>

      {images.length > 1 && (
        <div className="lightbox-counter">
          {currentIndex + 1} of {images.length}
        </div>
      )}
    </div>
  );
}
