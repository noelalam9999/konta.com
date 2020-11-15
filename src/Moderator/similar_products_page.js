import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import rate_review from '../assets/rate_review.svg';
import box from '../assets/box.svg';
import engineer from '../assets/engineer.svg';
import people from '../assets/people.svg';
import permission from '../assets/permission.svg';
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery,useMutation } from "@apollo/react-hooks";
import styles from './admin.modules.css';
import check from '../assets/check.svg';
import remove from '../assets/remove.svg';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DropdownButton from 'react-bootstrap/DropdownButton';


const GET_PRODUCT = gql`
query MyQuery($match: String,$id:Int) {
    products(where: {Name: {_ilike: $match}, status: {_eq: true},Product_id:{_neq:$id}}, order_by: {price: desc}) {
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
  

`;


const buttonIcon = {
    height:"20px",
    width:"20px"
  
  
  }
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));  

export function SimilarProductPage(props){
  console.log(props.id)
  const classes = useStyles();
  let [category1, setAge] = useState("");
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { match: props.match.params.Name, id:props.match.params.id}
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let url = new Array();
  {data.products.map((product,index) => (  
  
   url[index] = product.Product_id
  
    ))}

    const handleChange = (event) => {
      setAge(event.target.value);
     
    };


//let url= "localhost:3000/product/"+props.id;
console.log(url);
return(
<>
    {data.products.map((product,index) => ( 
        <>
    <div className={styles['search-result']}>
    <img src={product.Product_picture_link} alt='business' className={styles['business-image']}/>
    <div className={styles['business-info']}>
        <Link to={"/product/" + product.Product_id}>
        <h2  className="subtitle">{product.Name}</h2>
        </Link>
        {/* <BusinessRating number_of_reviews = {number_of_reviews}/> */}
        {/* {number_of_reviews.length} Reviews */}
        <p>{product.price}Tk <span className="tag">{product.Description}</span> {product.user.name}<span className="tag"></span></p>
    </div>
    <div className={styles['contact-info']}>
<p><a href={product.store_location_link}>
        <h2  className="subtitle">Visit Store</h2>
        </a></p>
      
    </div>
</div>
</>
))
   }
   </>
)

}