import React from 'react';
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
  products {
    Product_id
    user {
      name
    }
    Name
    price
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


const buttonIcon = {
    height:"20px",
    width:"20px"
  
  
  }
export function Products(props){


const [approve_product] = useMutation(APP_DEC,{
    variables:{id:props.products.Product_id, status:true},
    refetchQueries:[{query:GET_PRODUCTS}]
  });

  const [decline_product] = useMutation(APP_DEC,{
    variables:{id:props.products.Product_id, status:false},
    refetchQueries:[{query:GET_PRODUCTS}]
  });

  
return(
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


)

}