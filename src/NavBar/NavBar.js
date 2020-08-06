import React from 'react';
import logo from '../assets/logo.png';
import styles from './NavBar.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

// import {setInputVal} from '../Search/Search';
// import {search} from '../Search/Search';


export const NavBar = ({ inputVal, onChange, onSubmit}) => {
    return (
        <div className={styles['nav-bar']}>
            <Link to='/'><img src={logo} className={styles.logo} alt='logo'/></Link>
            <SearchBar 
            
            inputVal={inputVal}
            onChange={onChange}
            onSubmit={onSubmit}/>
            <button className={`button ${styles['nav-button']}`}>Log In</button>
            <button className={`button ${styles['nav-button']}`}>Sign Up</button>
        </div>
    );
}