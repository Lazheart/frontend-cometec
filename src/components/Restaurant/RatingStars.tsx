import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // For filled and outline stars
import '../../styles/RatingStars.css';

interface RatingStarsProps {
  rating: number; // Expected to be 1-10
  maxStars?: number; // Max display stars, usually 5
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
  // Convert 1-10 rating to a 1-maxStars scale
  const displayRating = (rating / 10) * maxStars;
  const filledStars = Math.round(displayRating); // Round to nearest full star
  const emptyStars = maxStars - filledStars;

  return (
    <div className="stars-container">
      {Array.from({ length: filledStars }).map((_, index) => (
        <FaStar key={`filled-${index}`} className="star-icon filled" />
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="star-icon empty" />
      ))}
    </div>
  );
};

export default RatingStars;
