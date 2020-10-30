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
const GET_PRODUCTS = gql`
query MyQuery {
  products{
    Product_id
    user {
      name
    }
    Name
    price
    moderator_id
    status
    category
    Description
    store_location_link
    Product_picture_link
  }
}

`


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

export function Products(props){
  console.log(props.id)
  const classes = useStyles();
  let [category1, setAge] = useState("");
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   change_category()
  // };

   
  //let mod_id = props.id;
  //let mod_id = props.id ? props.id : props.match.params.id;
  // console.log(mod_id)
  const { loading, error, data } = useQuery(LATEST_SUGGESTIONS);

const [approve_product] = useMutation(APP_DEC,{
  variables:{id:props.products.Product_id, status:true,category:category1},
  refetchQueries:[{query:GET_PRODUCTS}]
});
const [change_category] = useMutation(CHANGE_CATEGORY,{
  variables:{id:props.products.Product_id, category:category1},
  refetchQueries:[{query:GET_PRODUCTS}]
});


  const [decline_product] = useMutation(APP_DEC,{
    variables:{id:props.products.Product_id, status:false, category:category1},
    refetchQueries:[{query:GET_PRODUCTS}]
  });
  const [change_product_status] = useMutation(CHANGE_PRODUCT_STATUS,{
    variables:{id:props.products.moderator_id, product_status:true}
    
  });
  // const {  loading, error, data } = useQuery(GET_PRODUCTS, {
  //   variables: { id: props.products.Product_id}
  // });
  
  function refreshPage() {
    window.location.reload(false);
  }
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const handleChange = (event) => {
    setAge(event.target.value);
   
  };

  // const [get_new_products, { loading, error, data }] = useLazyQuery(GET_NEW_PRODUCT);

  // if (loading) return <p>Loading ...</p>;
  //   if (error) return <p>Error :(</p>;
  //     const [change_moderator_id] = useMutation(CHANGE_MOD_ID,{
  //       variables:{id:data.products.moderator_id, product_status:true}
        
  //     });
  let category = new Array()
  {data.products.map((product,index) => (  
  category[index] = 
    {value:product.category,label:product.category}
  
    ))}
    console.log(category1)
return(
  <>
 
    <tbody key={props.index} >
    <tr>
        <td>{props.products.user.name}</td>
        <td>{props.products.Name}</td>
        <td>{props.products.price}</td>
        <td>{props.products.Description}</td>
        <td>{props.products.store_location_link}</td>
        <td>
        <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-label">Categories</InputLabel> */}
        
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category1}
          onChange={handleChange}
        >
           
          <>
          { category.map((category,index) => (
           <>
           <MenuItem key ={index} value={category}>{category}</MenuItem>
        </>
))

          }
          
          </>
     
       
        </Select> */}
         {/* <DropdownButton
      alignRight
      title="Dropdown right"
      id="dropdown-menu-align-right"
    
        >
              <>
          { category.map((category,index) => (
          <>
           <Dropdown.Item key ={index} value={category}>{category}</Dropdown.Item>
          </>
            ))
          }
          
          </>
      </DropdownButton>
           */}

           {/* <Select   options={category}/> */}
           <select value={category1}
          onChange={handleChange}>
           <>
           { 
           category.map((category,index) => (
           <>
           <option value= {category.value}>{category.label}</option>
        </>
))
          }
           
           </>

           </select>
      </FormControl>

        </td>
       
       


      {props.products.status==null &&
      <td>
        <button onClick = {approve_product} className={`button ${styles['nav-button']}`}><img style={buttonIcon}  src={check}/></button>
        <button onClick = {decline_product} className={`button ${styles['nav-button']}`}><img style={buttonIcon} src={remove}/></button>
      </td>
      
      }
      {props.products.status==true &&
      <td>Approved</td>
      
      }
            {props.products.status==false &&
      <td>Declined</td>
      
      }
      
      
    </tr>
    </tbody>

</>

)

}