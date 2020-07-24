import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';




import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
  <Auth0Provider
      domain={config.domain}
      clientId="sUO3ww2UnauaHIXOfrbqJXpVdgnW5z0z"
      audience={config.audience}
      redirectUri={config.redirect_uri}
      onRedirectCallback={onRedirectCallback}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
