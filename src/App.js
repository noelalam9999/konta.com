import React from 'react';
import { LandingPage } from './LandingPage/LandingPage';
import "./App.css";
import { TopNav } from './LandingPage/TopNav/TopNav';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import Form from "./Products/Product_upload";
import Switch from 'react-bootstrap/esm/Switch';
import { Route, BrowserRouter } from 'react-router-dom';


function App() {
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
          <TopNav/>
           <Switch>
             <Route exact path='/' component={LandingPage}/>
<Route  path='/product_upload' component={Form} />


</Switch>
           
    </ApolloProvider>
    </BrowserRouter>
   
  );
}

export default App;
