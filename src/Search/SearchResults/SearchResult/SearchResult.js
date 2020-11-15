import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { POSTS_LIST } from "../SearchResults";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './SearchResult.module.css';
import { BusinessRating } from '../../../BusinessRating/BusinessRating';


const UPVOTE_POST = gql`
  mutation($postId: Int!, $userId: String!) {
    insert_point(objects: [{ post_id: $postId, user_id: $userId }]) {
      affected_rows
    }
  }
`;
// export default Post;
//-------------------mine----------------------

export const SearchResult = ({reviews,Product_picture_link,Product_id,Name, Description, user,store_location_link,price,count}) => {
    let number_of_reviews = new Array()
  {reviews.map((review,index) => (
    number_of_reviews[index]=review
  ))}

  // let user_name = new Array()
  // {user.map((user,index) => (
  //   user_name[index]=user.name
  // ))}
   console.log({store_location_link})
  return (
        <div className={styles['search-result']}>
            <img src={Product_picture_link} alt='business' className={styles['business-image']}/>
            <div className={styles['business-info']}>
                <Link to={"/product/" + Product_id}>
                <h2  className="subtitle">{Name}</h2>
                </Link>
                <BusinessRating number_of_reviews = {number_of_reviews}/>
                {number_of_reviews.length} Reviews
                <p>{price}Tk <span className="tag">{Description}</span> {user.name}<span className="tag"></span></p>
            </div>
            <div className={styles['contact-info']}>
    <p><a href={store_location_link}>
                <h2  className="subtitle">Visit Store</h2>
                </a></p>
              
            </div>
        </div>
    );
}