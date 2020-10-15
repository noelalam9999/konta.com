import React, { useState } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { NavBar } from '../NavBar/NavBar';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchResultsSummary } from './SearchResultsSummary/SearchResultsSummary';
import { SearchResultsCategory } from './SearchResults/SearchResultsCategory';
import useReactRouter from 'use-react-router';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Search.module.css'
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { TrendingSuggestions } from '../LandingPage/TrendingSuggestios/TrendingSuggestions';
import { Link } from "react-router-dom";

const SEARCH = gql`
query MyQuery($match: String) {
  products(where: {category: {_ilike: $match}}, order_by: {price: desc}) {
    Product_id
    Name
    Product_picture_link
    Description
    price
    user {
      id
    }
    
  }
}
`;
const FILTERED_SEARCH_RESULT = gql `
query MyQuery($name: String, $price:Int) {
  products(where: {Name: {_ilike: $name}, price: {_lte: $price}}) {
    Product_id
    Name
    Product_picture_link
    Description
    price
    user {
      id
    }
  }
}


`


export function Category_search(props) {

    // const {location} = useReactRouter();
    // const params = new URLSearchParams(location.search);
    // const term = params.get('find_desc');
    // const locationParam = params.get('find_loc');
    const [inputVal, setInputVal] = useState("");
    const [Search, { loading, error, data }] = useLazyQuery(SEARCH);


    if (loading) return <p>Loading ...</p>;
if (error) return <p>{error.message}</p>;
console.log(typeof inputVal)
    return (
        <div>
          <TopNav/>
          <div className={styles['nav-bar']}>
            
             <SearchBar 
            
            inputVal={inputVal}
            onChange = {(e) => setInputVal(e.target.value)}
            onSubmit={() => Search({ variables: { match: `%${inputVal}%` } })}            />
           
           </div>
            {/* <SearchResultsSummary product={props.match.params.products}/> */}
          
           <SearchResultsCategory newProducts={props.match.params.category ? props.match.params.category : null} />
           <div className={styles['search-results']}>
             You may also like
            <TrendingSuggestions/>
           </div>
           
           {/* {data!=null && 
           <SearchResults newProducts={data ? data.products : null} />
              
           } */}
              
            
        </div>
    );
}