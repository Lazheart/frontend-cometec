import React, { useState, useEffect } from 'react';
import '../../styles/ImageCarousel.css';

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Time in ms for image change
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // No need for carousel if one or zero images

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Clean up on unmount
  }, [images, interval]);

  if (images.length === 0) {
    return (
      <div className="image-carousel-container placeholder">
        No images available
      </div>
    );
  }

  return (
    <div className="image-carousel-container">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Restaurant view ${index + 1}`}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      {/* You can add navigation dots/arrows here if needed */}
    </div>
  );
};

export default ImageCarousel;
