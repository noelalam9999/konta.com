import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function StarRating({count, value, 
    inactiveColor='#ddd',size='30',
    activeColor='#fff', onChange}) {

  const stars = Array.from({length: count}, () => <FontAwesomeIcon icon='star'/>)

  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}>{s}</span>
        )
      })}
      {value}.0
    </div>
  )
}
function StarRatingDemo() {
    const [rating, setRating] = useState(3);

    const handleChange = (value) => {
      setRating(value);
    }
    return (
      <div>
       <StarRating 
         count={5}
         size={26}
         value={rating}
         activeColor ={'#FFA500'}
         inactiveColor={'#ddd'}
         onChange={handleChange} />
      </div>
    )
}

export default StarRatingDemo;