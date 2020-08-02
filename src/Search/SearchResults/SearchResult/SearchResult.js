import React from 'react';

import styles from './SearchResult.module.css';
import { BusinessRating } from '../../../BusinessRating/BusinessRating';

export function SearchResult() {
    return (
        <div className={styles['search-result']}>
            <img src='http://via.placeholder.com/210' alt='business' className={styles['business-image']}/>
            <div className={styles['business-info']}>
                <h2 className="subtitle">Burger Place</h2>
                <BusinessRating/>
                <p>$$ <span className="tag">Burgers</span> <span className="tag">Fast Food</span></p>
            </div>
            <div className={styles['contact-info']}>
                <p>+8801760767693</p>
                <p>Bashundhara Gate-01</p>
                <p>12/A Dhaka</p>
            </div>
        </div>
    );
}