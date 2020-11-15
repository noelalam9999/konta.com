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
import styles from './admin.modules.css';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery,useMutation } from "@apollo/react-hooks";



const GET_USERS = gql`
{
    user {
      products {
        Product_id
      }
      reviews {
        id
        body
      }
      id
      name
      
      karma_points
      status
    }
  }
`;

const BAN = gql`
mutation MyMutation($id:String!,$status:Boolean!) {
  update_user(where: {id: {_eq: $id}}, _set: {status: $status}) {
    returning {
      id
      status
    }
    affected_rows
  }
}
`

export function Users(props){

    const [ban_user] = useMutation(BAN,{
        variables:{id:props.user.id, status:false},
        refetchQueries:[{query:GET_USERS}]
      });
    
      const [unban_user] = useMutation(BAN,{
        variables:{id:props.user.id, status:true},
        refetchQueries:[{query:GET_USERS}]
      });


     return(
        <tbody>
        <tr>
     <td>{props.user.id}</td>
     <td>{props.user.name}</td>
     <td>{props.user.location}</td>
          <td>  <button className={`button ${styles['nav-button']}`}>View</button></td>
          <td><button className={`button ${styles['nav-button']}`}>View</button></td>
     <td>{props.user.karma_points}</td>
          {props.user.status==true  &&
      <td>
      <button onClick= {ban_user} className={`button ${styles['nav-button']}`}>BAN</button>
      </td>
      
      }
            {props.user.status==false  &&
   
   <td><button onClick= {unban_user} className={`button ${styles['nav-button']}`}>UNBAN</button></td>
          
      
      }


          
        </tr>
        </tbody>
      
     ) 

}

           
