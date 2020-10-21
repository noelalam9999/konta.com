import React, { useState } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { NavBar } from '../NavBar/NavBar';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchResultsSummary } from './SearchResultsSummary/SearchResultsSummary';
import { SearchResults } from './SearchResults/SearchResults';
import useReactRouter from 'use-react-router';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Search.module.css'
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { TrendingSuggestions } from '../LandingPage/TrendingSuggestios/TrendingSuggestions';


const SEARCH = gql`
query MyQuery($match: String) {
  products(where: {Name: {_ilike: $match}}, order_by: {price: desc}) {
    Product_id
    Name
    Product_picture_link
    store_location_link
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


export function Search(props) {

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
          
           <SearchResults newProducts={props.match.params.products ? props.match.params.products : null} />
          
           <div className={styles['search-results']}>
           <div className={styles['text']}>You may also like</div>
            <TrendingSuggestions/>
           </div>
           
           {/* {data!=null && 
           <SearchResults newProducts={data ? data.products : null} />
              
           } */}
              
            
        </div>
    );
}