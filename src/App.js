import React from "react";
import logo from "./logo.svg";
import { Router } from "@reach/router";

import Login from "./views/Login";
import NotFound from "./components/NotFound";
import Private from "./views/Private";
import PrivateRoute from "./hoc/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Login path="/login" default />
        <PrivateRoute component={Private} path="/" />
      </Router>
    </div>
  );
};

export default App;
