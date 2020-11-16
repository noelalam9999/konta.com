import React, { useState } from 'react';
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchBar } from '../SearchBar/SearchBar';
import styles1 from './product.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ReviewPostButton,TextArea} from './Form';
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import LikeButtonDemo from "./reactButton";  
import StarRatingDemo from "./starRating";    
import { Link } from "react-router-dom";

import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";
import {Reviews} from "./Reviews"
import { RichText, Date} from 'prismic-reactjs';

import {Timestamp} from "react-timestamp";
import {moment} from "moment"
const GET_PRODUCT = gql`
query MyQuery($id: Int) {
  products(where: {Product_id: {_eq: $id}}) {
    Name
    Product_id
    Description
    Product_picture_link
    store_location_link
    status
    created_at
    user {
        id
        name
      }
      reviews {
        body
        user {
          id
          name
        }
      }
    }
}
`;




let current_mod=-1;
let total_mods = 0;

export function Product_suggestions(props) {
    const [body, setReviewBody] = useState("");
   
    
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    
    const [error2, setError] = useState("");
  let  increment = 0
 
  
 let next_product = parseInt(props.props)
 next_product++
 console.log(next_product)
  const {  loading,error, data } = useQuery(GET_PRODUCT, {
        variables: { id: next_product}
      });
      
       if (loading) return "Loading...";
       if (error) return `Error! ${error.message}`;  
       let number_of_reviews = new Array()
       {data.products.map((product,index) => (
        
        <>{product.reviews.map((review,index) => (

        number_of_reviews[index]=review
       
       ))}
       </>
        ))}
return (
<>

{data.products.map((product,index)=>(
            <div className={styles1.productSuggestionBox}>
              <Link to={"/product/"+product.Product_id}>
                    <div className={styles1.SuggestionDetailBox}>
                        <div className={styles1.reviewerImage}>
                            <img src={product.Product_picture_link} className={styles1.userImageSmall}/>
                        </div>
                        <div className={styles1.reviewerDetail}>
                          <ul className={styles1.productNametitle}>{product.Name}</ul>
                            <div>
                              <ul>{number_of_reviews.length}</ul>
                                {/* <ul><StarRatingDemo/></ul> */}
                            </div>
                        </div>        
                    </div>
                
                    </Link>
                
                </div>    
    ))}
   

   
</>
);
}
export default Product_suggestions;