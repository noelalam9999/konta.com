import React from "react";
import styles from './SearchResults.module.css';
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
import Post from "./SearchResult/SearchResult";
import { SearchResult } from './SearchResult/SearchResult';
import styles1 from '../SearchResultsSummary/SearchResultsSummary.module.css';
import  { useState } from 'react';
import Icon from '../../LandingPage/icons'
import Footer from '../../LandingPage/footer'

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
const SEARCH_RESULT = gql`
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

`


export const SearchResults = ({newProducts}) => {
    // const { loading, error, data } = useQuery(POSTS_LIST);
    // if (loading) return "Loading...";
    // if (error) return `Error! ${error.message}`;

    const { loading, error, data } = useQuery(SEARCH_RESULT,{
      variables : {match: `%${newProducts}%`}
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
  
  
    let price_range = 4
    const change_price_range= (range) =>{

     price_range=range;
    }
let max_price
    {data.products.slice(0,1).map(({price}) => (
     max_price = price
    ))}
 let number_of_products = new Array()
 {data.products.map(({price},index) => (
  number_of_products[index]=price
 ))}

// const low_price = useQuery(
//   FILTERED_SEARCH_RESULT,{
//     variables : {name: `%${newProducts}%`,price:max_price*0.33}
//   })
//   const medium_price = useQuery(
//     FILTERED_SEARCH_RESULT,{
//       variables : {name: `%${newProducts}%`,price:max_price*0.66}
//     })

    // if (low_price.loading) return "Loading...";
    // if (low_price.error) return `Error! ${error.message}`;
    // if (medium_price.loading) return "Loading...";
    // if (medium_price.error) return `Error! ${error.message}`;
return(
  <>
  <div className={styles1.container}>
  <div className={styles.searchSummary}>
    <span className={styles.searchResultText}>Found {number_of_products.length} result(s).</span>
  </div>
  {/* {number_of_products.length==0 &&
      <span className={styles.searchResultText}>
       Sorry...! Nothing related to your search was found. :(
      </span>    
  } */}
  <div className={styles1.filters}>
      {/* <button className="button">
          <span className="icon"><i className="fas fa-sliders-h"></i></span>
          <span>All Filters</span>
      </button>
          <div className="buttons has-addons">
          <button onClick={change_price_range(1) } className="button">$</button>
          <button onClick={change_price_range(2)} className="button">$$</button>
          <button onClick={change_price_range(3)} className="button">$$$</button>
        
          </div>
      
      */}
  </div>
</div>

  <div>
    {data==null &&
      <Container className="postlist">
      <ol>
       Sorry Nothing relates to your search 
      </ol>
    </Container>
      
    }
    {number_of_products.length==0 &&
      <div className={styles.noResultBox}>
        <span className={styles.noResultText}>
        Sorry! Nothing related to your search was found. :(
        </span>  
      </div>  
    }
    {data!=null &&
    <Container className="postlist" style={{backgroundColor: 'inherit', marginTop: '40px', marginBottom: '40px'}}>
    <ol>
      {data.products.map(({Product_id,Name, Description,user,Product_picture_link,store_location_link,price,reviews}) => (

  //       <>
  //     {reviews_aggregate.aggregate.map((aggregate) => (
  //  <> 
  //  {aggregate.count.map((count) => (

        <SearchResult reviews={reviews} store_location_link={store_location_link} Product_picture_link={Product_picture_link} Product_id={Product_id} price={price} Name={Name} Description={Description} user ={user}  />
  //       ))}
  
  //  </>
  //         ))}
  //       </>
        
      ))}
    </ol>
  </Container>
    
    }

    </div>
    </>
)
    
data=null;
          
    
    // else 
    // {
    //   // return (
    //   //   <Container className="postlist">
    //   //     <ol>
    //   //       {data.products.map(({Name, Description,user_id}) => (
    //   //         <SearchResult Name={Name} Description={Description} user_id ={user_id} />
    //   //       ))}
    //   //     </ol>
    //   //   </Container>
    //   // );
    // }

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