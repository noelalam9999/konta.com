import React from "react";
import styles from './SearchResults.module.css';
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import Post from "./SearchResult/SearchResult";
import { SearchResult } from './SearchResult/SearchResult';

// export const POSTS_LIST = gql`
//   {
//       products(order_by: { created_at: desc }) {
//       Product_id
//       created_at
      
      
//       Description
//       user {
//         id
//         name
//       }
     
//     }
//   }
// `;

export const SearchResults = ({newProducts}) => {
  //  const { loading, error, data } = useQuery(POSTS_LIST);
  
    // if (loading) return "Loading...";
    // if (error) return `Error! ${error.message}`;
  // console.log(newProducts);
  
    

  
  
  
  
  
  return (
      <Container className="postlist">
        <ol>
          {newProducts.map((post, index) => (
            <SearchResult key={index} post={post} />
          ))}
        </ol>
      </Container>
    );
  
  
  }  
  export default  withApollo(SearchResults);





//---------------swap------------------------

// export function SearchResults() {
//     return (
//         <div className={styles['search-results']}>
//             <SearchResult/>
//             <SearchResult/>
//         </div>
//     );
// }