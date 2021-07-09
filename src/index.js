import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Amplify from "aws-amplify";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// views without layouts

import Landing from "./views/Landing";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";

import { COGNITO } from "./configs/aws";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      {/* <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} /> */}
      {/* <Route path="/" exact component={Index} /> */}
      <Route path="/" exact component={Landing} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
