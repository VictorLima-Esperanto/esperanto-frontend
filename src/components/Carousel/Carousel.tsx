// src/components/Carousel/Carousel.tsx
import { useState } from 'react';
import './Carousel.css';
import type { CustomCarouselProps } from '@/types/components/CarouselTypes';

export default function Carousel<T>({
  items,
  renderItem,
  initialIndex = 0,
}: CustomCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prevItem = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const nextItem = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));

  return (
    <div className="carousel-container">
      <button
        className="carousel-nav prev"
        onClick={prevItem}
        disabled={currentIndex === 0}
      >
        &#10094;
      </button>

      <div className="carousel-viewport">
        <div className="carousel-track">
          {items.map((item, idx) => {
            const position = idx - currentIndex; // -1 = left, 0 = center, 1 = right
            const className =
              position === 0
                ? 'center'
                : position === -1
                  ? 'left'
                  : position === 1
                    ? 'right'
                    : 'hidden';

            return (
              <div key={idx} className={`carousel-item ${className}`}>
                {renderItem(item, position === 0)}
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="carousel-nav next"
        onClick={nextItem}
        disabled={currentIndex === items.length - 1}
      >
        &#10095;
      </button>
    </div>
  );
}
