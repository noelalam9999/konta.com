import React, { Component } from 'react';
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchBar } from '../SearchBar/SearchBar';
//import { NavBar } from '../NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import stylos from './userprofile.module.css';
import { NavLink,Link } from "react-router-dom";
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import { SubNavItem } from '../NavBar/SubNav/SubNavItem/SubNavItem';
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MuiButton from '@material-ui/core/Button';

const GET_USER = gql`
query MyQuery($id: String) {
  user(where: {id: {_eq: $id}}) {
    name
    location
    user_type
    reviews {
      product_id
      body
      rating
      status
      product {
        Name
      }
    }
    products {
      Product_id
      Name
      Description
    }
  }
}
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


function Userprofile(props){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
     const { isAuthenticated, user } = useAuth0();
     const isLoggedUser = () => {
      if (user.sub === props.match.params.id) {
        return true;
      } else {
        return false;
      }
    };
    console.log(props.match.params.id);
    const { loading, error, data } = useQuery(GET_USER, {
      variables: { id: props.match.params.id}
    });
     if (loading) return "Loading...";
     if (error) return `Error! ${error.message}`;
    console.log(data.user.user_type)
let user_type 
let reviews_count = new Array()
{data.user.map((user,index)=>(
  <>
  {user.reviews.map((reviews,index)=>(
    reviews_count[index] = reviews
         ) )}
         </>
       ) )}
       
    {data.user.map((user,index)=>(
user_type = user.user_type
     ) )}
      return(

       

        <>
       
          <TopNav/>
        
        

        <br/>
        
        {!isAuthenticated && (
              <div>Please signin to see this page</div>
            )}

{isAuthenticated && (  
        <div className={stylos.layout}>
        <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="My Review History" {...a11yProps(1)} />
          <Tab label="My Product History" {...a11yProps(2)} />
          {user_type=="admin"  &&(
             <Link to={"/admin/" + user.sub}>
          <Tab label="Admin Panel" {...a11yProps(3)} />
          </Link>
          )}
          {user_type=="moderator"  &&(
          <Link to={"/mod_reviews/" + user.sub}>
          <Tab label="Moderator Panel" {...a11yProps(4)} />
          </Link>
          )}
          </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <div style={{display: 'flex', displayDirection: 'row',paddingBottom: '40px', paddingTop:'40px', paddingLeft: '40px'}}>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Link to='/upload_profile_pic'>
                      <SubNavItem icon='fas fa-edit' title='upload picture'></SubNavItem>
                    </Link>
                  </div>
                <img src={user.User_Picture_link} className={stylos.userImage}/>
                
                <div className={stylos.styleinfo_userinfo}>
              

                <div style={{marginLeft: '80px'}}>
          <ul    className={stylos.styleinfo_username}>{user.nickname}</ul>
          
          {data.user.map((user,index)=>(
          
                <ul key={index}  className={stylos.styleinfo_userlocation}>{user.location}</ul>
            ))} 
                <div style={{display: "flex", flexDirection:"column", justifyContent: 'space-evenly'}}>
          <ul className={stylos.styleinfo_usercred}>{reviews_count.length} Reviews</ul>
                <ul className={stylos.styleinfo_usercred}>10 Photo </ul>
                </div>
                </div>
                
                </div>
              </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
          {data.user.map((user,index)=>(
          <>
          {user.reviews.map((reviews,index)=>(
          <>
          <Card className={stylos.card}>
              <CardContent>
              {/* {reviews.product.map((product,index)=>( */}
          <span style={{fontSize: '20px', fontStyle: 'bold'}}></span>
          {/* ) )}    */}
          <Typography>"{reviews.body}"</Typography>
              </CardContent>
              <CardActions>
                {/* <Link to={"/product/" + reviews.product_id} >
                <MuiButton >See Review</MuiButton>
                </Link> */}
                    <Typography>"{reviews.status}"</Typography>
              </CardActions>
          </Card>

          </>
              ) )}
          </>
              )
            )
          }
      </TabPanel>
      <TabPanel value={value} index={2}>
      {data.user.map((user,index)=>(
      <>
      {user.products.map((products,index)=>(
      <>
      <Card className={stylos.card}>
              <CardContent>
                <span style={{fontSize: '20px', fontStyle: 'bold'}}>{products.Name}</span>
                <Typography>{products.Description}</Typography>
              </CardContent>
              <CardActions>
                <MuiButton><Link to={"/product/" + products.Product_id}>
                See Product
                </Link></MuiButton>
              </CardActions>
          </Card>
        </>
        ) )}
        </>
      ) )}
        
      </TabPanel>
      </div>          
      </div>   
      )}
        {/* <div className={styles.landing3}>
                        <div className={styles['font']}>
                            <p>Browse By Content</p>
                        </div>
                        <div className={styles.landing1}>
                            <BrowseContent/>
                        </div>
        </div> */}

        {/* <div className={styles.landing4}>
                        <div className={styles['font']}>
                            <p>Footer</p>
                        </div>
        </div>
         */}
        
        </>
        
        );
  }
  export default Userprofile;