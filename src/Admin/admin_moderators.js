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
import { useQuery } from "@apollo/react-hooks";
import styles from './admin.modules.css';
import check from '../assets/check.svg';
import remove from '../assets/remove.svg';
import Button from 'react-bootstrap/Button'
import {Users} from "./show_mods";
import { useAuth0 } from "@auth0/auth0-react";
import { printIntrospectionSchema } from 'graphql';
const drawerWidth = 240;

const GET_MODS = gql`
{
  user(where: {user_type: {_eq: "moderator"}}) {
    id
    name
    karma_points
    salaries {
      bonus
      salary
    }
    status
  }

}
`;
const GET_USER = gql`
query MyQuery($id: String) {
  user(where: {id: {_eq: $id}, user_type: {_eq: "admin"}}) {
    name
    location
    user_type
  }
}

`;

const listItem = {
    height:"30px",
    width:"30px",
   

};
const home = {
  marginLeft: "50px", 
  padding:"20px",
  backgroundColor:"#E0E0E0"
};
const highlighted = {
    backgroundColor:"#E0E0E0"
};
const danger_button = {
backgroundColor:"#d32323"
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

export  function Admin_moderators(props) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const classes = useStyles();
  

  const { loading, error, data } = useQuery(GET_MODS);
  console.log(props.match.params.id)
  const admin = useQuery(GET_USER, {
    variables: { id: props.match.params.id }
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
console.log(admin)
  return (
    <div className={classes.root}>

{isAuthenticated && (
        
        <>
        {/* {admin.user.id == user.sub &&(<> */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
          <Link to="/">
          <Typography style={home} variant="primary">
            Home
          </Typography>
        </Link>
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
          <Link to={"/admin/"+user.sub}>
              <ListItem style={highlighted} button key="Review">
                <ListItemIcon><img src={rate_review}/></ListItemIcon>
                <ListItemText primary="Review" />
              </ListItem>
           </Link>     
            
           <Link to={"/admin_product/"+user.sub}>
              <ListItem  button key="Products">
                <ListItemIcon><img style={listItem} src={box}/></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

            </Link>  
            <Link to={"/admin_permissions/"+user.sub}>
              <ListItem button key="Permissions">
                <ListItemIcon><img style={listItem}  src={permission}/></ListItemIcon>
                <ListItemText primary="Permissions" />
              </ListItem>

            </Link>
            <Link to={"/admin_moderators/"+user.sub}>
              <ListItem button key="Moderators">
                <ListItemIcon><img style={listItem}  src={engineer}/></ListItemIcon>
                <ListItemText primary="Moderators" />
              </ListItem>
            </Link>
            <Link to={"/admin_users/"+user.sub}>
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
      <th>Mod ID</th>
      <th>Mod Name</th>
      <th>Performance Score</th>
      <th>salary</th>
      <th>bonus</th>
      <th>Flag</th>

    </tr>
  </thead>
  {data.user.map((user,index)=>(
 <Users user = {user} index = {index}/>
))} 
    </Table>
      </main>
      {/* </>)}   */}
</>
)}

    </div>

  );
}