'use client';

import { useState, useCallback } from 'react';
import Lightbox from './Lightbox';

export default function Gallery({ images, studentName }: { images: string[]; studentName: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  return (
    <>
      <div className="gallery-grid">
        {images.map((url, index) => (
          <div
            key={index}
            className="gallery-card"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            {!loadedImages.has(index) && <div className="gallery-skeleton" />}
            <img
              src={url}
              alt={`Gallery photo ${index + 1} of ${studentName}`}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              className={loadedImages.has(index) ? 'loaded' : ''}
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          studentName={studentName}
        />
      )}
    </>
  );
}
