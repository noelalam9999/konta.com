import React, { useState } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { NavBar } from '../NavBar/NavBar';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchResultsSummary } from './SearchResultsSummary/SearchResultsSummary';
import { SearchResultsSubCategory } from './SearchResults/SearchResultsSubCategory';
import useReactRouter from 'use-react-router';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Search.module.css'
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { TrendingSuggestions } from '../LandingPage/TrendingSuggestios/TrendingSuggestions';
import { Link } from "react-router-dom";
import Icon from '../LandingPage/icons'
import Footer from '../LandingPage/footer'

const SEARCH = gql`
query MyQuery($match: String) {
  products(where: {subcategories: {_ilike: $match}}, order_by: {price: desc}) {
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


export function SubCategory_search(props) {

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
          
           <SearchResultsSubCategory newProducts={props.match.params.category ? props.match.params.category : null} />
       
           <div className={styles['search-results']}>
           <div className={styles['text']}>You may also like</div>
            <TrendingSuggestions/>
           </div>
           
           {/* {data!=null && 
           <SearchResults newProducts={data ? data.products : null} />
              
           } */}
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">Story</Footer.Link>
                    <Footer.Link href="#">Clients</Footer.Link>
                    <Footer.Link href="#">Testimonials</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Services</Footer.Title>
                    <Footer.Link href="#">Marketing</Footer.Link>
                    <Footer.Link href="#">Consulting</Footer.Link>
                    <Footer.Link href="#">Development</Footer.Link>
                    <Footer.Link href="#">Design</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contact Us</Footer.Title>
                    <Footer.Link href="#">United States</Footer.Link>
                    <Footer.Link href="#">United Kingdom</Footer.Link>
                    <Footer.Link href="#">Australia</Footer.Link>
                    <Footer.Link href="#">Support</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Social</Footer.Title>
                    <Footer.Link href="#"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-youtube" />Youtube</Footer.Link>
                    <Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link>
                </Footer.Column>
            </Footer.Row>
            </Footer.Wrapper>
        </Footer>      
            
        </div>
    );
}