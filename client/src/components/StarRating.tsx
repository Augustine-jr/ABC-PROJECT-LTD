import React from 'react'
import { assets } from '../assets/assets';


const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img 
          key={star}
          src={assets.star_icon} 
          alt="star"
          className={`w-4 h-4 ${star <= rating ? 'opacity-100' : 'opacity-30'}`}
        />
      ))}
    </div>
  );

export default StarRating