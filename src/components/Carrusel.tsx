import React, { useState, useEffect } from "react";
import '../styles/Carrusel.css';

interface CarruselProps {
  images: string[];
  interval?: number;
  className?: string;
  imgClassName?: string;
}

const Carrusel: React.FC<CarruselProps> = ({
  images,
  interval = 3000,
  className = "",
  imgClassName = ""
}) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 500);
    return () => clearTimeout(timeout);
  }, [current]);

  useEffect(() => {
    const id = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval, current]);

  return (
    <div className={`carrusel-container ${className}`}>
      <img
        src={images[current]}
        alt={`Imagen${current + 1}`}
        className={`carrusel-img ${imgClassName} ${fade ? "fade" : ""}`}
      />
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot${current === idx ? " active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;