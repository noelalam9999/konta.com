import React from 'react';
import { SubNavItem } from './SubNavItem/SubNavItem';
import styles from './SubNav.module.css';

export function SubNav() {
    return(
        <div className={styles.container}>
             <div className={styles['sub-nav']}>
                    <div>
                        <SubNavItem label='Hotels' icon='fas fa-hotel'/>
                        <SubNavItem label='Home Services' icon='fas fa-home'/>
                        <SubNavItem label='Car Rents' icon='fas fa-car'/>
                        <SubNavItem label='More' icon='fas fa-info-circle' showRightBorder/>
                    </div>
                    <div>
                        <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                             <span className="icon"><i className="fas fa-pen"/></span>
                            <span>Write a Review</span>
                        </button>
                        <button className={`button ${styles['subnav-button']} ${styles['omit-right-border']}`}>
                              <span className="icon"><i className="fas fa-briefcase"/></span>
                             <span>For Business</span>
                        </button>
                    </div>
                
             </div>
        </div>
        
    );
}