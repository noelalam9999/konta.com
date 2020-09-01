import React, { Component } from 'react';
import styles from './TopNav.module.css';

import { withRouter } from "react-router";
import { Nav,Navbar, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink,Link } from "react-router-dom";



export function TopNav() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
 
  
    return(
       

            // <Row className="ml-auto">


        
            <Nav>
            <Navbar   className={styles['top-nav']} >
           
            <NavLink className = "d-inline p-2 bg-dark text-white" to="/">
            Home
            </NavLink>
            
            {!isAuthenticated && (
              <>
                <Button
                  //className="auth-button"
                  className={styles.right}
                  variant="primary" 
                  onClick={() => loginWithRedirect({})}
                >
                  Log in
                </Button>
              </>
            )}

            {isAuthenticated && (
              <>
               <NavLink className={styles.left} to="/product_upload">
            Post a new product
            </NavLink>
                <span className={styles.left}>
                  user :
                  {/* <Link className={styles.left} exact to={"/User/" + user.sub} >
                    {user.nickname}
                  </Link>  */}
                  <Link className={styles.left} to={"/user/" + user.sub} >
                    {user.nickname}
                  </Link> 
                </span>
                
                <Button className={styles.right} variant="danger" onClick={() => logout()}>
                  Log out
                </Button>
              </>
            )}
            </Navbar>
              </Nav>
          
       
          // </Row>

             
    );
}

