import React, {Component} from 'react';
import pic from './laundry.png';
import pic1 from './massage.png';
import pic2 from './locksmith.png';
import pic3 from './gym.png';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import styles from './TrendingSuggestions.module.css';
const LATEST_SUGGESTIONS = gql`
query MyQuery {
    products(distinct_on: category) {
      Product_picture_link
      category
    }
  }
  
`


export function TrendingSuggestions() {

     const { loading, error, data } = useQuery(LATEST_SUGGESTIONS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return(

        <div className={styles.suggestions}>

{data.products.slice(0,4).map((product,index) => (
         <Link to={"/category_search/" + product.category}>
         <span><img src={product.Product_picture_link} className={styles.pic} alt='laundry'/>
       <h2 className={styles.font}>{product.category}</h2></span>
         </Link>
      
      ))}
            
                {/* <span><img src={pic1} className={styles.pic} alt='massage'/>
                <h2 className={styles.font}>MASSAGE</h2></span>
           
                <span><img src={pic2} className={styles.pic} alt='locksmith'/>
                <h2 className={styles.font}>LOCKSMITH</h2></span>
            
                <span><img src={pic3} className={styles.pic} alt='gym'/>
                <h2 className={styles.font}>GYM</h2></span> */}
           
        </div>
    );
}