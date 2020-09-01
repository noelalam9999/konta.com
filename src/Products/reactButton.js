import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LikeButton({count, value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#DC143C', onChange}) {

  const stars = Array.from({length: count}, () => <FontAwesomeIcon icon='heart' />)
  const handleChange = (value) => {
    onChange(value=1);
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
      {value}
    </div>
  )
}

function LikeButtonDemo() {
  const [rating, setRating] = useState(0);

  const handleChange = (value) => {
    setRating(value);
  }
  return (
    <div>
     <LikeButton 
       count={1}
       size={26}
       value={rating}
       activeColor ={'#DC143C'}
       inactiveColor={'#ddd'}
       onChange={handleChange}  />
    </div>
  )
}

export default LikeButtonDemo;
