import React, { useState} from 'react'
import { FaStar } from 'react-icons/fa';
 const StarRating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
  return (
    <div>
        
           
            {[...Array(5)].map((star,i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input type="radio"
                          className='radioStarBtn'
                           name="rating" 
                           value={ratingValue} 
                           onClick={() => setRating(ratingValue)}
                           
                          
                             />
                        <FaStar color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          className="star"
                          size={50}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                           />
                   
                    </label>
                    

                    
                );
            })}

            <p> la note est de {rating}</p>
    </div>
    
  );
};
export default StarRating;
