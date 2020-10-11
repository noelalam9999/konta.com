import React from 'react';
import { TopNav } from './TopNav/TopNav';
import logo from '../assets/logo.png';
import styles from './LandingPage.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';
import { TrendingSuggestions } from './TrendingSuggestios/TrendingSuggestions';
import  { useState } from 'react';
import { useLazyQuery, gql } from "@apollo/client";


import { LatestSuggestions } from './LatestSuggestions/LatestSuggestions';
import { BrowseContent } from './BrowseContent/BrowseContent';


const SEARCH = gql`
query Search($match: String) {
    products(order_by:{Name:asc}, where : {Name:{_ilike: $match}}) {
      Name
      Description
      user {
        id
      }
    }
  }
  
`;


export function LandingPage(){
    const [inputVal, setInputVal] = useState("");
    const [Search, { loading, error, data }] = useLazyQuery(SEARCH);


    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :(</p>;
    return(
        <div className={styles.landing1}>
            
            <TopNav/>
            <div className={styles['search-area']}>
            
            <img src={logo} className={styles.logo} alt='logo'/>
            <div className={styles['subtitle']}>Get Authentic Reviews of Any and All Products in the market</div>
            <SearchBar 
            
            inputVal={inputVal}
            onChange = {(e) => setInputVal(e.target.value)}
            onSubmit={() => Search({ variables: { match: `%${inputVal}%` } })}            />
            <SearchSuggestions/>
            
            <span className={styles.font1} >Find the Best Businesses in Town</span>
            <TrendingSuggestions/>
           

            
           

            
            </div>



            
            <div>
                        <div className={styles['font']}>
                            <p>KONTA in Bangladesh</p>
                        </div>

                        <div className={styles.suggestions}>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Dhaka</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Chattogram</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Sylhet</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Khulna</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Rajshahi</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Barishal</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Rangpur</span>
                            <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Jessore</span>
                        </div>

                        <div className={styles['font']}>
                            <p>Hot & New Businesses</p>
                        </div>

                        <div className={styles.landing1}>
                            <LatestSuggestions/>
                        </div>
                </div>

                <div className={styles.landing3}>
                        <div className={styles['font']}>
                            <p>Browse By Content</p>
                        </div>

                        <div className={styles.landing1}>
                            <BrowseContent/>
                        </div>
                </div>

                <div className={styles.landing4}>
                        <div className={styles['font']}>
                            <p>Footer</p>
                        </div>
                </div>


        </div>
        
        
    );
}