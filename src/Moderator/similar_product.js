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



const LATEST_SUGGESTIONS = gql`
query MyQuery {
  products(distinct_on: category, where: {category: {_neq: "null"}}) {
    Product_picture_link
    category
  }
}

`
const APP_DEC = gql`
mutation MyMutation($id: Int!, $status: Boolean!,$category:String!) {
  update_products(where: {Product_id: {_eq: $id}}, _set: {status: $status, category: $category}) {
    returning {
      Product_id
      status
      category
    }
    affected_rows
  }
}

`

const CHANGE_PRODUCT_STATUS = gql`
mutation MyMutation($id: String!, $product_status:Boolean!) {
  update_user(where: {id: {_eq: $id}}, _set: {product_status: true}) {
    affected_rows
  }
}

`
const CHANGE_CATEGORY = gql`
mutation MyMutation($id: String!, $category:String!) {
  update_products(where: {id: {_eq: $id}}, _set: {category: $category}) {
    affected_rows
  }
}

`

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

export function SimilarProduct(props){
  console.log(props.id)
  const classes = useStyles();
  let [category1, setAge] = useState("");
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { match: props.Name, id:props.id}
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
let url= "localhost:3000/product/"+props.id;
console.log(url);
return(
 <>
 { data &&(
<>


{data.products.map((product,index) => (  
    
    <a href={url}>See product</a> 
    ))}



</>

 )

 }
 
 </>

)

}