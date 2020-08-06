import React , { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchResultsSummary } from './SearchResultsSummary/SearchResultsSummary';
import { SearchResults } from './SearchResults/SearchResults';
import useReactRouter from 'use-react-router';
import { useLazyQuery, useQuery, gql } from "@apollo/client";


const SEARCH = gql`
  query Search($match: String) {
    products(order_by: { created_at: asc }, where: { Name: { _ilike: $match } }) {
        Product_id
        created_at
        
        
        Description
        user {
          id
          name
        }
    }
  }
`;
 
//const [search, { loading, error, data }] = useLazyQuery(SEARCH);
export function Search() {

    const {location} = useReactRouter();
    const params = new URLSearchParams(location.search);
    const term = params.get('find_desc');
    const locationParam = params.get('find_loc');
    
    const [inputVal, setInputVal] = useState("");
 const [search, { loading, error, data }] = useLazyQuery(SEARCH);
   
console.log(data);

    return (
      
        <div>
          
            <NavBar  
           
            inputVal={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onSubmit={() => search({ variables: { match: `%${inputVal}%` } })}/>
            <SubNav/>
            <SearchResultsSummary term={term} location={locationParam}/>
            <SearchResults newProducts={data ? data.products : null}/>
            {/* <SearchResults newProducts={data ? data.products : null}/> */}
        </div>
    );
}