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

const GET_PRODUCTS = gql`
 {
  products{
    Product_id
    user {
      name
    }
    Name
    price
    moderator_id
    status
    Description
    store_location_link
    Product_picture_link
  }
}


`

const APP_DEC = gql`
mutation MyMutation($id:Int!,$status:Boolean!) {
    update_products(where: {Product_id: {_eq: $id}}, _set: {status: $status}) {
      returning {
        Product_id
        status
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
const GET_NEW_PRODUCT = gql`
query MyQuery {
  products(where: {status: {_is_null: true}}, limit: 1) {
    Product_id
    user {
      name
    }
    Name
    price
    moderator_id
    status
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
export function Products(props){
  console.log(props.id)
  
   
  //let mod_id = props.id;
  //let mod_id = props.id ? props.id : props.match.params.id;
  // console.log(mod_id)

  // const { loading, error, data } = useQuery(GET_PRODUCTS,{
  //   variables: { id: mod_id}
  // });

const [approve_product] = useMutation(APP_DEC,{
  variables:{id:props.products.Product_id, status:true},
  refetchQueries:[{query:GET_NEW_PRODUCT}]
});

  const [decline_product] = useMutation(APP_DEC,{
    variables:{id:props.products.Product_id, status:false},
    refetchQueries:[{query:GET_NEW_PRODUCT}]
  });
  const [change_product_status] = useMutation(CHANGE_PRODUCT_STATUS,{
    variables:{id:props.products.moderator_id, product_status:true}
    
  });

  function refreshPage() {
    window.location.reload(false);
  }

  // const [get_new_products, { loading, error, data }] = useLazyQuery(GET_NEW_PRODUCT);

  // if (loading) return <p>Loading ...</p>;
  //   if (error) return <p>Error :(</p>;
  //     const [change_moderator_id] = useMutation(CHANGE_MOD_ID,{
  //       variables:{id:data.products.moderator_id, product_status:true}
        
  //     });

return(
  <>
 
    <tbody key={props.index} >
    <tr>
        <td>{props.products.user.name}</td>
        <td>{props.products.Name}</td>
        <td>{props.products.price}</td>
        <td>{props.products.Description}</td>
        <td>{props.products.store_location_link}</td>
        <td><button className={`button `}>View</button></td>



      {props.products.status==null &&
      <td>
        <button onClick = {()=> {approve_product();change_product_status();refreshPage();}} className={`button ${styles['nav-button']}`}><img style={buttonIcon}  src={check}/></button>
        <button onClick = {()=> {decline_product();change_product_status();refreshPage();}} className={`button ${styles['nav-button']}`}><img style={buttonIcon} src={remove}/></button>
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