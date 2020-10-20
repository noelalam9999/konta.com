import React, {Component} from 'react';
// import pic from './laundry.png';
// import pic1 from './massage.png';
// import pic2 from './locksmith.png';
// import pic3 from './gym.png';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import styles from './TrendingSuggestions.module.css';
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
  root: {
    maxWidth: 290,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 20px 90px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    height: 200,
    paddingTop: "10px"
  },
})

const LATEST_SUGGESTIONS = gql`
query MyQuery {
    products(distinct_on: category) {
      Product_picture_link
      category
    }
  }
  
`


export function TrendingSuggestions() {
  const classes = useStyles();

     const { loading, error, data } = useQuery(LATEST_SUGGESTIONS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return(
      <>
      <Grid container className={classes.gridContainer} spacing={2}>
          {data.products.slice(0,12).map((product,index) => (
            <Grid item xs={12} sm={6} md={3} style={{width: '290px'}}>
              <Link to={"/category_search/" + product.category}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={product.Product_picture_link}
                      title={product.category}
                    />
                    <CardContent>
                      <Typography align="center" gutterBottom variant="h5" component="h2">
                        {product.category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid> 
      ))}
            
                {/* <span><img src={pic1} className={styles.pic} alt='massage'/>
                <h2 className={styles.font}>MASSAGE</h2></span>
           
                <span><img src={pic2} className={styles.pic} alt='locksmith'/>
                <h2 className={styles.font}>LOCKSMITH</h2></span>
            
                <span><img src={pic3} className={styles.pic} alt='gym'/>
                <h2 className={styles.font}>GYM</h2></span> */}  
      </Grid>
        </>
    );
}