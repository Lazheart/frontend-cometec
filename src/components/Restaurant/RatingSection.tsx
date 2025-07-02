import React from 'react';
import RatingStars from './RatingStars';
import '../../styles/RatingSection.css';

interface RatingSectionProps {
  averageRating: number; // Expects 1-10
}

const RatingSection: React.FC<RatingSectionProps> = ({ averageRating }) => {
  return (
    <div className="rating-section-card">
      <h2 className="rating-section-title">Calificación</h2>
      <RatingStars rating={averageRating} />
    </div>
  );
};

export default RatingSection;
