import React, {Component} from 'react';
import pic from './event.png';
import pic1 from './hotel.png';
import pic2 from './taxi.png';
import pic3 from './service.png';

import styles from './LatestSuggestions.module.css';

export function LatestSuggestions() {
    return(

        <div className={styles.suggestions}>
            
                <span><img src={pic} className={styles.pic} alt='event'/>
                <h2 className={styles.font}>EVENTS</h2></span>
            
                <span><img src={pic1} className={styles.pic} alt='hotel'/>
                <h2 className={styles.font}>HOTELS</h2></span>
           
                <span><img src={pic2} className={styles.pic} alt='taxi'/>
                <h2 className={styles.font}>TAXI</h2></span>
            
                <span><img src={pic3} className={styles.pic} alt='service'/>
                <h2 className={styles.font}>SERVICES</h2></span>
  
        </div>
    );
}