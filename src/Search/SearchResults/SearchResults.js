import React from "react";
import styles from './SearchResults.module.css';
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import Post from "./SearchResult/SearchResult";
import { SearchResult } from './SearchResult/SearchResult';

export const POSTS_LIST = gql`
  {
    products(order_by: { Name:asc }) {
      Name
      Description
      user {
        id
        
      }
     
    }
  }
`;

export const SearchResults = ({newProducts}) => {
    const { loading, error, data } = useQuery(POSTS_LIST);
  
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if (newProducts!=null){
    return (
      <Container className="postlist">
        <ol>
          {newProducts.map(({Name, Description,user_id}) => (
            <SearchResult Name={Name} Description={Description} user_id ={user_id} />
          ))}
        </ol>
      </Container>
    );}
    else 
    {
      return (
        <Container className="postlist">
          <ol>
            {data.products.map(({Name, Description,user_id}) => (
              <SearchResult Name={Name} Description={Description} user_id ={user_id} />
            ))}
          </ol>
        </Container>
      );
    }

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