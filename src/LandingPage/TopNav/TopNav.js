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
       

            <Row className="styles.ml-auto">


        
            <Nav>
            <Navbar>
            <span> &nbsp;|&nbsp; </span>
            <NavLink className = "d-inline p-2 bg-dark text-white" to="/">
            Home
            </NavLink>
            
            <span> &nbsp;|&nbsp; </span>

            {!isAuthenticated && (
              <>
                <Button
                  //className="auth-button"
                  variant="primary" size="lg"
                  onClick={() => loginWithRedirect({})}
                >
                  Log in
                </Button>
              </>
            )}

            {isAuthenticated && (
              <>
               <NavLink className = "d-inline p-2 bg-dark text-white" to="/product_upload">
            Post a new product
            </NavLink>
                <span> &nbsp;|&nbsp; </span>
                <span className="anchor">
                  user :
                  <Link className="anchor" to={"/user/" + user.sub}>
                    {user.nickname}
                  </Link>
                </span>
                <span> &nbsp;|&nbsp; </span>
                <Button variant="danger" onClick={() => logout()}>
                  Log out
                </Button>
              </>
            )}
            </Navbar>
              </Nav>
          
       
          </Row>

             
    );
}

