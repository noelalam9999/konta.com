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

// function Post(props) {
//   const { isAuthenticated, user } = useAuth0();

//   let loggedUserId = "";
//   if (isAuthenticated) {
//     loggedUserId = user.sub;
//   }

//   const postdate = new Date(props.post.created_at);

//   const [upvotePost] = useMutation(UPVOTE_POST, {
//     variables: { postId: props.post.id, userId: loggedUserId },
//     refetchQueries: [{ query: POSTS_LIST }]
//   });

//   return (
//     <Row className="post" key={props.index}>
//       {/* key is just a react thing, you can read it here : https://reactjs.org/docs/lists-and-keys.html#keys */}
//       <Col>
//         <Row>
//           <li className="post-id">
//             {isAuthenticated && (
//               <span className="anchor cursor" onClick={upvotePost}>
//                 ▲
//               </span>
//             )}
//             &nbsp;
//             <a className="anchor" href={props.post.url}>
//               {props.post.description}
//             </a>
//           </li>
//         </Row>
//         <Row>
//           {/* <span className="post-id">
//             {props.post.points_aggregate.aggregate.count} points | by&nbsp;
//           </span> */}
//           <Link className="anchor post-id" to={"/user/" + props.post.user.id}>
//             {props.post.user.name}
//           </Link>
//           <span className="post-id">
//             &nbsp;created at {postdate.toString()};
//           </span>
//         </Row>
//       </Col>
//     </Row>
//   );
// }

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
  // console.log(user_name)
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
    <p><Link to={store_location_link}>
                <h2  className="subtitle">Visit Store</h2>
                </Link></p>
              
            </div>
        </div>
    );
}


