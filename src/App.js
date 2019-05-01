import React from "react";
import logo from "./logo.svg";
import { Router } from "@reach/router";

import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./components/NotFound";
import Home from "./views/Home";
import PrivateRoute from "./hoc/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Login path="/login" />
        <Register path="/register" />
        <PrivateRoute component={Home} path="/" />
      </Router>
    </div>
  );
};

export default App;
