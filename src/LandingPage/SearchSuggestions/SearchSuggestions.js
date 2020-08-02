import React from 'react';
import styles from './SearchSuggestions.module.css';

export function SearchSuggestions(){
    return(
        <div className={styles.suggestions}>
            <span className="icon is-small"><i className="fas fa-cocktail" color="white"></i></span><span className={styles.suggestion}>Nightlife</span>
            <span className="icon is-small"><i className="fas fa-concierge-bell" color="white"></i></span><span className={styles.suggestion}>Services</span>
            <span className="icon is-small"><i className="fas fa-truck" color="white"></i></span><span className={styles.suggestion}>Delivery Services</span>
            <span className="icon is-small"><i className="fas fa-wrench" color="white"></i></span><span className={styles.suggestion}>Plumbers</span>
        </div>
    );
}