import React from "react";
import { Router } from "@reach/router";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Login from "./views/Login";
import Register from "./views/Register";
import NewAlbum from "./views/NewAlbum";
import Home from "./views/Home";
import Account from "./views/Account";
import PrivateRoute from "./hoc/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Login path="/login" />
        <Register path="/register" />
        <PrivateRoute component={Home} path="/" />
        <PrivateRoute component={NewAlbum} path="/albums/new" />
        <PrivateRoute component={Account} path="/me" />
      </Router>
    </div>
  );
};

export default App;
