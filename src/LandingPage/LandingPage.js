import React from 'react';
import { TopNav } from './TopNav/TopNav';
import styles from './LandingPage.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';
import { TrendingSuggestions } from './TrendingSuggestios/TrendingSuggestions';
import  { useState } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
//import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Icon from './icons'
import Footer from './footer'
import CatagoryView from './categoryBar';
import {SuggestedProductsOne} from './suggested_products1'
import {SuggestedProductsTwo} from './suggested_products2'
import {SuggestedProductsThree} from './suggested_products3'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';


const SEARCH = gql`
query MyQuery($match: String) {
  products(where: {Name: {_ilike: $match}, status: {_eq: true}}, order_by: {price: desc}) {
    Product_id
    Name
    Product_picture_link
    store_location_link
    Description
    price
    user {
      id
      name
    }
    reviews {
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


export function LandingPage(){
    const [inputVal, setInputVal] = useState("");
    const [Search, { loading, error, data }] = useLazyQuery(SEARCH);


    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :(</p>;
      return(
        <div className={styles.landing1}>

            <TopNav/>
            <div className={styles['search-area']}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className={styles['search-area-sub']}>
            
            <SearchBar

            inputVal={inputVal}
            onChange = {(e) => setInputVal(e.target.value)}
            onSubmit={() => Search({ variables: { match: `%${inputVal}%` } })} />
            </div>
            <br></br>
            <div className={styles['subtitle']}>Get Authentic Reviews of Any and All Products in the Market</div>
            {/* <SearchSuggestions/> */}
            <CatagoryView/>
            <br></br>
            <br></br>
            <div className={styles.suggProd_container}> 
              <div className={styles.SuggCatTitle}>
                <span className={styles.title_decor}>Household </span>
              </div>
              <hr className={styles.dividingline}></hr>
              <SuggestedProductsOne/>
              <br></br>
              <div className={styles.SuggCatTitle}>
                <span className={styles.title_decor}>Fast Food </span>
              </div>
              <hr className={styles.dividingline}></hr>
              <SuggestedProductsTwo/>
              <br></br>
              <div className={styles.SuggCatTitle}>
                <span className={styles.title_decor}>Daily Needs</span>
              </div>
              <hr className={styles.dividingline}></hr>          
              <SuggestedProductsThree/>
              <br></br>
              <hr className={styles.dividingline}></hr>
            </div>
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

                        {/* <div className={styles['font']}>
                            <p>Hot & New Businesses</p>
                        </div> */}

                        <div className={styles.landing1}>
                            {/* <LatestSuggestions/> */}
                        </div>
                </div>

                <div className={styles.landing3}>


                </div>


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
    //   return(
    //     <div className={styles.landing1}>

    //         <TopNav/>
    //         <div className={styles['search-area']}>
    //         <br></br>
    //         <br></br>
    //         <br></br>
    //         <br></br>
    //         <SearchBar

    //         inputVal={inputVal}
    //         onChange = {(e) => setInputVal(e.target.value)}
    //         onSubmit={() => Search({ variables: { match: `%${inputVal}%` } })}            />
    //         <br></br>
    //         <div className={styles['subtitle']}>Get Authentic Reviews of Any and All Products in the Market</div>
    //         {/* <SearchSuggestions/> */}
    //         <CatagoryView/>
    //         <br></br>
    //         <br></br>
    //         <div className={styles.suggProd_container}> 
    //           <div className={styles.SuggCatTitle}>
    //             <span className={styles.title_decor}>Household </span>
    //           </div>
    //           <hr className={styles.dividingline}></hr>
    //           <SuggestedProductsOne/>
    //           <br></br>
    //           <div className={styles.SuggCatTitle}>
    //             <span className={styles.title_decor}>Fast Food </span>
    //           </div>
    //           <hr className={styles.dividingline}></hr>
    //           <SuggestedProductsTwo/>
    //           <br></br>
    //           <div className={styles.SuggCatTitle}>
    //             <span className={styles.title_decor}>Daily Needs</span>
    //           </div>
    //           <hr className={styles.dividingline}></hr>          
    //           <SuggestedProductsThree/>
    //           <br></br>
    //           <hr className={styles.dividingline}></hr>
    //         </div>
    //         </div>
            
    //         <div>
    //                     <div className={styles['font']}>
    //                         <p>KONTA in Bangladesh</p>
    //                     </div>
    //                     <div className={styles.suggestions}>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Dhaka</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Chattogram</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Sylhet</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Khulna</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Rajshahi</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Barishal</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Rangpur</span>
    //                         <span className="icon is-small"><i className="fas fa-city" color="black"></i></span><span className={styles.suggestion}>Jessore</span>
    //                     </div>

    //                     {/* <div className={styles['font']}>
    //                         <p>Hot & New Businesses</p>
    //                     </div> */}

    //                     <div className={styles.landing1}>
    //                         {/* <LatestSuggestions/> */}
    //                     </div>
    //             </div>

    //             <div className={styles.landing3}>


    //             </div>


    //             <Footer>
    //         <Footer.Wrapper>
    //         <Footer.Row>
    //             <Footer.Column>
    //             <Footer.Title>About Us</Footer.Title>
    //                 <Footer.Link href="#">Story</Footer.Link>
    //                 <Footer.Link href="#">Clients</Footer.Link>
    //                 <Footer.Link href="#">Testimonials</Footer.Link>
    //             </Footer.Column>
    //             <Footer.Column>
    //             <Footer.Title>Services</Footer.Title>
    //                 <Footer.Link href="#">Marketing</Footer.Link>
    //                 <Footer.Link href="#">Consulting</Footer.Link>
    //                 <Footer.Link href="#">Development</Footer.Link>
    //                 <Footer.Link href="#">Design</Footer.Link>
    //             </Footer.Column>
    //             <Footer.Column>
    //             <Footer.Title>Contact Us</Footer.Title>
    //                 <Footer.Link href="#">United States</Footer.Link>
    //                 <Footer.Link href="#">United Kingdom</Footer.Link>
    //                 <Footer.Link href="#">Australia</Footer.Link>
    //                 <Footer.Link href="#">Support</Footer.Link>
    //             </Footer.Column>
    //             <Footer.Column>
    //             <Footer.Title>Social</Footer.Title>
    //                 <Footer.Link href="#"><Icon className="fab fa-facebook-f" />Facebook</Footer.Link>
    //                 <Footer.Link href="#"><Icon className="fab fa-instagram" />Instagram</Footer.Link>
    //                 <Footer.Link href="#"><Icon className="fab fa-youtube" />Youtube</Footer.Link>
    //                 <Footer.Link href="#"><Icon className="fab fa-twitter" />Twitter</Footer.Link>
    //             </Footer.Column>
    //         </Footer.Row>
    //         </Footer.Wrapper>
    //     </Footer>
    // </div>

    // );
}