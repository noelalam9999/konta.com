import React from "react";
import { render } from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import PlanetSearch from "./components/PlanetSearch";
import Planet from "./components/Planet";
import Logo from "./components/shared/Logo";
import "./index.css";
import Navbar from './components/layout/Navbar';


const GRAPHQL_ENDPOINT = "yelp-clone2.herokuapp.com/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);




const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});



const App = () => (
   
    <div>
    
    
      
  <BrowserRouter className="BrowserRouter">
  <Navbar/> 
    <ApolloProvider  client={client}>
      <Logo />
      <Switch className='text-center'>
        <Route path="/planet/:id" component={Planet} />
        <Route path="/" component={PlanetSearch} />
      </Switch>
    </ApolloProvider>
  </BrowserRouter>
  
  </div>
  
);

render(<App />, document.getElementById("root"));
