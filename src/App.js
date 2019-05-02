import React from "react";
import { Router } from "@reach/router";

import Login from "./views/Login";
import Register from "./views/Register";
import Album from "./views/Album";
import Home from "./views/Home";
import PrivateRoute from "./hoc/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Login path="/login" />
        <Register path="/register" />
        <PrivateRoute component={Home} path="/" />
        <PrivateRoute component={Album} path="/albums/new" />
      </Router>
    </div>
  );
};

export default App;
