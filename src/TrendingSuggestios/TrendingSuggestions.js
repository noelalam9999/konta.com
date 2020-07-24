import React, {Component} from 'react';
import pic from './laundry.png';
import pic1 from './massage.png';
import pic2 from './locksmith.png';
import pic3 from './gym.png';

import styles from './TrendingSuggestions.module.css';

export function TrendingSuggestions() {
    return(

        <div className={styles.suggestions}>

                <span><img src={pic} className={styles.pic} alt='laundry'/>
                <h2 className={styles.font}>LAUNDRY</h2></span>
            
                <span><img src={pic1} className={styles.pic} alt='massage'/>
                <h2 className={styles.font}>MASSAGE</h2></span>
           
                <span><img src={pic2} className={styles.pic} alt='locksmith'/>
                <h2 className={styles.font}>LOCKSMITH</h2></span>
            
                <span><img src={pic3} className={styles.pic} alt='gym'/>
                <h2 className={styles.font}>GYM</h2></span>
           
        </div>
    );
}