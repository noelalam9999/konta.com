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
import StarRating from "./starRating";    
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { SelectPanel } from 'react-multi-select-component';


const GET_PRODUCT = gql`
query MyQuery($id: Int) {
  products(where: {Product_id: {_eq: $id}}) {
    Name
    Description
    store_location_link
    status
    user {
        id
        name
      }
      reviews {
        body
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
mutation MyMutation($body: String!, $product_id: Int, $user_id: String!, $moderator_id: String!,$receipt_image_link:String!,$rating:Int) {
    insert_review(objects: {body: $body, product_id: $product_id, user_id: $user_id,moderator_id: $moderator_id,receipt_image_link:$receipt_image_link,rating:$rating}) {
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

   let current_mod=-1;
   let total_mods = 0;

   export function Reviews(props){


    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'konta-productimg')
        setLoading(true)
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/dr1xdii7w/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
        setImage(file.secure_url)
        setLoading(false)
    }

    const history = useHistory();
    const [body, setReviewBody] = useState("");
    const [insert_review] = useMutation(INSERT_REVIEW);
    const {error, data} = useQuery(FIND_MOD);
    const [error2, setError] = useState("");

    const [rating, setRating] = useState(0);

    const handleChange = (value) => {
      setRating(value);
    }

    if (loading) return "Loading...";
       if (error) return `Error! ${error.message}`;  
console.log(props.product_id)

const Refresh =() => {
  window.location.reload(false);
}
    const onSubmit = (e) => {
        e.preventDefault();
        if (!body|| !image) {
          return alert('fill all the fields first!')
      }

        let mod_id = new Array();
        {data.user.map(({id},index) => (
            mod_id[index]=id
          ))}
          console.log(total_mods);
          total_mods = mod_id.length;
        
        const unassigned = "unassigned"; 
        if(current_mod<total_mods){
            current_mod++
        }
        else
        {
            current_mod=0
        }


        insert_review({
            variables : {body, product_id:props.product_id, user_id:props.user_id,moderator_id: mod_id[current_mod],receipt_image_link:image,rating:rating},
            refetchQueries:[{query:GET_PRODUCT,
                variables: { id: props.product_id }
            }]
        }).catch(function(error){
            console.log(error);
            setError(error.toString());
        });
     
       // setReviewBody('');
       //
    }
   


return(
    <>
    <TextArea onChange={e=> setReviewBody(e.target.value)} type='text' placeholder='Share your experience with us.'/>
    <span> Insert receipt photo<input style={{}}
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                /></span>
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={image} style={{ width: '250px', height:'320px'}} />
                )}
                <div>
       <StarRating 
         count={5}
         size={26}
         value={rating}
         activeColor ={'#FFA500'}
         inactiveColor={'#ddd'}
         onChange={handleChange} />
      </div>
                 {/* <ul><StarRatingDemo handleChange={handleChange} rating={rating}/></ul>  */}
    <ReviewPostButton onClick = {(e)=>{onSubmit(e);Refresh()}}> Post Review </ReviewPostButton>
</>
)

   }