import React from 'react';
import styles from './BrowseContent.module.css';

export function BrowseContent() {
    return(
        <div className={styles.container}>
             <div className={styles['browseContent']}>
                    <div>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                        <span className="icon is-medium"><i className="fas fa-shopping-bag"/></span>
                            <span>SHOPPING</span>
                        </button>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-glass-martini"/></span>
                             <span>NIGHT LIFE</span>
                        </button>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-spa"/></span>
                             <span>BEAUTY & SPA</span>
                        </button>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-wrench"/></span>
                             <span>HOME SERVICE</span>
                        </button>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-taxi"/></span>
                             <span>AUTOMOTIVE</span>
                        </button>
                        <button className={`button ${styles['browseContect-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-atom"/></span>
                             <span>ACTIVE LIFE</span>
                        </button>
                    </div>
                
             </div>
        </div>
        
    );
}