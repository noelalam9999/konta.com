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



const GET_REVIEWS = gql`
{
  review {
    id
    body
    type
    status
   moderator_id
    user {
      id
      name
    }
    product_id
  }
}
`;
const CHANGE_REVIEW_STATUS = gql`
mutation MyMutation($id: String!, $review_status:Boolean!) {
  update_user(where: {id: {_eq: $id}}, _set: {review_status: true}) {
    affected_rows
  }
}

`
const POS_NEG = gql`
mutation MyMutation($id:uuid!,$type:Boolean!) {
  update_review(where: {id: {_eq: $id}}, _set: {type: $type}) {
    returning {
      id
      status
    }
    affected_rows
  }
}
`

const APP_DEC = gql`
mutation MyMutation2($id:uuid!,$status:Boolean!) {
  update_review(where: {id: {_eq: $id}}, _set: {status: $status}) {
    returning {
      id
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
export function Reviews(props){


const [approve_review] = useMutation(APP_DEC,{
    variables:{id:props.review.id, status:true},
    refetchQueries:[{query:GET_REVIEWS}]
  });

  const [decline_review] = useMutation(APP_DEC,{
    variables:{id:props.review.id, status:false},
    refetchQueries:[{query:GET_REVIEWS}]
  });

  const [make_positive] = useMutation(POS_NEG,{
    variables:{id:props.review.id, type:true},
    refetchQueries:[{query:GET_REVIEWS}]
  });

  const [make_negative] = useMutation(POS_NEG,{
    variables:{id:props.review.id, type:false},
    refetchQueries:[{query:GET_REVIEWS}]
  });
  const [change_review_status] = useMutation(CHANGE_REVIEW_STATUS,{
    variables:{id:props.review.moderator_id, review_status:true}
    
  });
return(
    <tbody key={props.index} >
    <tr>
      <td>{props.review.user.name}</td>
  <td>{props.review.product_id}</td>
  <td>{props.review.body}</td>
      <td><button className={`button ${styles['nav-button']}`}>View</button></td>


      {props.review.type==null &&
      <td>
        <button onClick = {make_positive} className={`button ${styles['nav-button']}`}>+</button>
        <button onClick = {make_negative} className={`button ${styles['nav-button']}`}>-</button>
      </td>
      }

      {props.review.type==true &&
      
      <td>Positive</td>
      }

      {props.review.type==false &&
      
      <td>Negative</td>
      }

      {props.review.status==null &&
      <td>
        <button onClick = {() => {approve_review();change_review_status();}} className={`button ${styles['nav-button']}`}><img style={buttonIcon}  src={check}/></button>
        <button onClick = {() => {decline_review();change_review_status();}} className={`button ${styles['nav-button']}`}><img style={buttonIcon} src={remove}/></button>
      </td>
      
      }
      {props.review.status==true &&
      <td>Approved</td>
      
      }
            {props.review.status==false &&
      <td>Declined</td>
      
      }
      
      
    </tr>
    </tbody>


)

}