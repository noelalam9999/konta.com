import React from 'react';
import { TopNav } from './TopNav/TopNav';
import logo from '../assets/logo.png';
import styles from './LandingPage.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';
import { TrendingSuggestions } from '../TrendingSuggestios/TrendingSuggestions';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Form from '../Products/Product_upload';


export function LandingPage(){
    return(
        <div className={styles.landing}>
            <div className={styles['search-area']}>
            
            <img src={logo} className={styles.logo} alt='logo'/>
            <SearchBar/>
            <SearchSuggestions/>
            
            <span className={styles.font1} >Find the Best Businesses in Town</span>
            <TrendingSuggestions/>
           

            
           

            
            </div>
            
        </div>
        
        
    );
}