import React, { useState } from 'react';
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchBar } from '../SearchBar/SearchBar';
import styles1 from './product.module.css';
import {ReviewPostButton,TextArea} from './Form';
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import LikeButtonDemo from "./reactButton";  
import {BusinessRating} from "../BusinessRating/BusinessRating";    
import { Link } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";
import {Reviews} from "./Reviews"
import Typography from "@material-ui/core/Typography";
import {Product_suggestions} from "./product_suggestion"
import { RichText, Date} from 'prismic-reactjs';
import {product_suggestions} from "./product_suggestion"
import {Timestamp} from "react-timestamp";
import {moment} from "moment";

const GET_PRODUCT = gql`
query MyQuery($id: Int) {
  products(where: {Product_id: {_eq: $id}}) {
    Name
    Description
    Product_picture_link
    store_location_link
    status
    user {
      id
      name
    }
    reviews(where: {status: {_eq: true}}) {
      body
      status
      created_at
      user {
        id
        name
      }
    }
  }
}

`;

const INSERT_REVIEW = gql
`
mutation MyMutation($body: String!, $product_id: Int, $user_id: String!, $moderator_id: String!) {
    insert_review(objects: {body: $body, product_id: $product_id, user_id: $user_id,moderator_id: $moderator_id}) {
      affected_rows
    }
  }
  
 ` 

 const FIND_MOD = gql
 `
 query  {
    user(where: {user_type: {_eq: "moderator"}}) {
      id
    }
  }`
  ;
  const CHANGE_MOD_STATUS = gql
  `
  mutation ($id:String!) {
    update_user(where: {id: {_eq: $id}}, _set: {review_status: false}) {
      returning {
        product_status
      }
    }
  }
   `
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

let current_mod=-1;
let total_mods = 0;

export function Product(props) {
    const [body, setReviewBody] = useState("");
   
    
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const [insert_review] = useMutation(INSERT_REVIEW);
    const [error2, setError] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [Search, { data1 }] = useLazyQuery(SEARCH);


    const {  loading,error, data } = useQuery(GET_PRODUCT, {
        variables: { id: props.match.params.Product_id}
      });
      
       if (loading) return "Loading...";
       if (error) return `Error! ${error.message}`;  
    // const onSubmit = (e) => {
    //     e.preventDefault();


    //     // let mod_id = new Array();
    //     // {data1.user.map(({id},index) => (
    //     //     mod_id[index]=id
    //     //   ))}
    //     //   console.log(total_mods);
    //     //   total_mods = mod_id.length;
        
    //     // const unassigned = "unassigned"; 
    //     // if(current_mod<total_mods){
    //     //     current_mod++
    //     // }
    //     // else
    //     // {
    //     //     current_mod=0
    //     // }


    //     insert_review({
    //         variables : {body, product_id:props.match.params.Product_id, user_id:user.sub,moderator_id: mod_id[current_mod] },
    //         refetchQueries:[{query:GET_PRODUCT}]
    //     }).catch(function(error){
    //         console.log(error);
    //         setError(error.toString());
    //     });
    //     setReviewBody('');
       
    // }
    let timestamp
    {data.products.map((product,index)=>(
     timestamp = product.created_at
    
        ))}
        timestamp = Date(timestamp)
        	
 timestamp = Intl.DateTimeFormat('en-US',{
	
    year: "numeric",
      
    month: "short",
      
    day: "2-digit",
      
    hour: "numeric",
      
    minute: "2-digit",
      
    second: "2-digit"
      
  }).format(timestamp);

        console.log(timestamp)
return (
<>

   <TopNav/>
    <div className={styles1.searchBar}>
   <SearchBar
            
            inputVal={inputVal}
            onChange = {(e) => setInputVal(e.target.value)}
            onSubmit={() => Search({ variables: { match: `%${inputVal}%` } })}/>
            </div>
    <br/>
    <div className={styles1.productInfoContainer}>
        <div style={{display: 'flex', flexDirection: 'row', paddingTop: '20px',paddingLeft: '200px'}}>

          
            {data.products.map((product,index)=>(
                <>
                <img src={product.Product_picture_link} className={styles1.userImage}/>

                <div className={styles1.styleinfo_productinfo}>
                <ul>Published on {timestamp}</ul>
                <ul className={styles1.styleinfo_productname}>{product.Name} </ul>
                <a href={product.store_location_link} className={styles1.styleinfo_productlocation}>See Location/Visit Site</a>
                {product.status==true &&(
                    <ul> Approved</ul>
                )

                }
                {product.status==null &&(
                    <ul> Pending Approval</ul>
                )
                }
                {product.status==false &&(
                    <ul> Declined</ul>
                )

                }
                </div> 
                </>
               
                ))}
               
               
            
            <div className={styles1.styleinfo_productinfo2}>
                <ul className={styles1.menu_itemlist}>
                {data.products.map((product,index)=>(
            <li className={styles1.menuitem}>Posted By {product.user.name} </li>
            ))} 
                </ul>
                
             
            </div>           
        </div>
    </div>
    <div className={styles1.productInfoContainer2}>
        
        <div className={styles1.reviewPostBox}>
        {isAuthenticated && (
            <>
        {data.products.map((product,index)=>(
             
    <>  
            {product.status==true && (
                <div className={styles1.PostBox}>
                <ul className={styles1.boxTitle}>Write a Review </ul>
                {/* <TextArea onChange={e=> setReviewBody(e.target.value)} type='text' placeholder='Share your experience with us.'/>
                <ReviewPostButton onClick = {onSubmit}> Post Review </ReviewPostButton> */}
                <Reviews product_id={props.match.params.Product_id} user_id={user.sub}/>
                 
            </div>

            )}
            
           
         </>

                        ))}    
        </>
        )}
         {!isAuthenticated && (
            <>
            <ul className={styles1.sign_in_prompt}>Please Login/Sign-up to post a Review</ul>
            <Link>
              <Typography
                className={styles1.item_style}
                variant="primary"
                onClick={() => loginWithRedirect({})}
              >
                {" "}
                Log In / Sign Up
              </Typography>
            </Link>
            </>
        )}
            <ul className={styles1.boxTitle}>Reviews</ul>
            <div className={styles1.reviewPanel}>  {/* start for each loop from here for every individual review */}
        
        
            {data.products.map((product,index)=>(
             
                <>  
                 {product.reviews!=null&&(
                <div key={index} className={styles1.ReviewBox}>
                     {product.reviews.map((review,index)=>(
                         <>
                    <div className={styles1.reviewerDetailBox}>
                        
                        <div className={styles1.reviewerImage}>
                            <img src="" className={styles1.userImageSmall}/>
                        </div>
                        
                        <div className={styles1.reviewerDetail}>
                       
                            
                            <div key={index}>
                            <ul className={styles1.reviewerName}>{review.user.name}</ul>
                            
                        <div  className={styles1.userReviewBox}>
                        {review.status==true &&(
                    <ul> Approved</ul>
                )

                }
                {review.status==null &&(
                    <ul> Pending Approval</ul>
                )
                }
                {review.status==false &&(
                    <ul> Declined</ul>
                )

                }
                        <ul><BusinessRating/></ul>
            <ul className={styles1.reviewDate}></ul>
                        <ul>{review.body}
                        </ul>
                        <div><LikeButtonDemo/></div>
                    </div>
                    </div>
                         

                        
                        </div>
                    </div>
                    </>
                        ))}
                </div>
                    
  )   }
  </>
  
            ))}   
            
            </div>
        </div>
        <div className={styles1.suggestionContainer}>
            <ul className={styles1.boxTitle}>You May Also Consider</ul>
            <div className={styles1.suggestionPanel}>
                <Product_suggestions props={props.match.params.Product_id}/>
                <Product_suggestions props={props.match.params.Product_id}/>
            </div>
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
</>
);
}


export default Product;