import React from 'react';
import { LandingPage } from './LandingPage/LandingPage';
import "./App.css";
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import Product_upload from "./Products/Product_upload";
import Switch from 'react-bootstrap/esm/Switch';
import { Route, BrowserRouter } from 'react-router-dom';
import PostList from "./Products/Product_list"
import {Search} from './Search/Search';
import Userprofile from './User/userprofile';


function App() {
  const { isAuthenticated, user } = useAuth0();
  const httpLink = new HttpLink({
    uri: "http://yelp-clone2.herokuapp.com/v1/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
        
           <Switch>

              <Route exact path='/' component={LandingPage}/>
              <Route exact path='/product_upload' component={Product_upload} />
              <Route exact path='/products' component={PostList} />
              <Route path='/search' component={Search}/>
              <Route path={'/user/:id'} component={Userprofile}/>

            </Switch>
           
    </ApolloProvider>
    </BrowserRouter>
   
  );
}

export default App;
