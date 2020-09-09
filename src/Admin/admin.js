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
import {Reviews} from './show_reviews';
const drawerWidth = 240;

const GET_REVIEWS = gql`
{
  review {
    id
    body
    status
    type
    user {
      id
      name
    }
    product_id
  }
}
`;

const buttonIcon = {
  height:"20px",
  width:"20px"


}

const listItem = {
    height:"30px",
    width:"30px"

};

const highlighted = {
  backgroundColor:"#E0E0E0"
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));

export  function Admin() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_REVIEWS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
          <Link to="/admin">
              <ListItem style = {highlighted} button key="Review">
                <ListItemIcon><img src={rate_review}/></ListItemIcon>
                <ListItemText primary="Review" />
              </ListItem>
          </Link>     
          <Link to="/admin_product"> 
           
              <ListItem button key="Products">
                <ListItemIcon><img style={listItem} src={box}/></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
          </Link >    
          
          <Link to="/admin_permissions">
              <ListItem button key="Permissions">
                <ListItemIcon><img style={listItem}  src={permission}/></ListItemIcon>
                <ListItemText primary="Permissions" />
              </ListItem>
          </Link>
          <Link to="/admin_moderators">    
              <ListItem button key="Moderators">
                <ListItemIcon><img style={listItem}  src={engineer}/></ListItemIcon>
                <ListItemText primary="Moderators" />
              </ListItem>
          </Link >
          <Link to="/admin_users">   
              <ListItem button key="Users">
                <ListItemIcon><img style={listItem} src={people}/></ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
          </Link>    
          </List>
          <Divider />
          <List>
            {['Approved', 'Pending', 'Cancel'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>User</th>
      <th>Product ID</th>
      <th>Review</th>
      <th>Receipt</th>
      <th>+/-</th>
      <th>Approve/Decline</th>
      
    </tr>
  </thead>
  {data.review.map((review,index)=>(
  <Reviews review = {review} index = {index}/>
))} 
    </Table>
      </main>
    </div>
  );
}