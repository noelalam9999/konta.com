import React from 'react';
import styles from './SearchResultsSummary.module.css';
import { useQuery, gql } from "@apollo/client";

const SEARCH = gql`
query Search($match: String) {
    products(order_by:{Name:asc}, where : {Name:{_ilike: $match}}) {
      Product_id
      Name
      Description
      user {
        id
      }
    }
  }
  
`;

export const SearchResultsSummary = ({product}) => {
console.log(product.toString())
    const { loading, error, data } = useQuery(SEARCH,{
        variables: {match: product.toString()}
    });
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error.message}</p>;
let number_of_products = data.length
let products= new Array();
{data.products.map(({Product_id},index) => (
    products[index]=Product_id
    
  ))}
console.log(products)
    return (
        <div className={styles.container}>
            <div className={styles['search-summary']}>
            
    
            </div>

            <div className={styles.filters}>
                <button className="button">
                    <span className="icon"><i className="fas fa-sliders-h"></i></span>
                    <span>All Filters</span>
                </button>
                    <div className="buttons has-addons">
                    <button className="button">$</button>
                    <button className="button">$$</button>
                    <button className="button">$$$</button>
                    <button className="button">$$$$</button>
                    </div>
                
               
            </div>
        </div>
        
    )
}