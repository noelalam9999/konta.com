import React, {Component} from 'react';
// import pic from './laundry.png';
// import pic1 from './massage.png';
// import pic2 from './locksmith.png';
// import pic3 from './gym.png';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import styles from './TrendingSuggestios/TrendingSuggestions.module.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import {makeStyles, } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '140px',
    paddingRight: '140px',
    backgroundColor: 'inherit',
  },
  media: {
    height: '200',
    paddingTop: "250px",
    "&:hover": {
      filter: 'blur(2px)',
    },
  },
})

const LATEST_SUGGESTIONS = gql`
query MyQuery {
    products(where: {status: {_eq: true}, category: {_eq: "daily needs"}}, order_by: {price: desc}) {
      Product_picture_link
      Name
      Product_id
    }
  }
  
  
`


export function SuggestedProductsThree() {
  const classes = useStyles();

     const { loading, error, data } = useQuery(LATEST_SUGGESTIONS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return(
      <>
      <Grid container className={classes.gridContainer} spacing={2}>
          {data.products.slice(0,4).map((product,index) => (
            <Grid item xs={12} sm={6} md={3} style={{width: '290px'}}>
              <Link to={"/product/" + product.Product_id}>
                <Card className={styles.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                       image={product.Product_picture_link}
                       title={product.Name}
                    />
                      <div className={styles.overlay}>
                        {product.Name}
                      </div>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid> 
      ))}
      </Grid>
        </>
    );
}