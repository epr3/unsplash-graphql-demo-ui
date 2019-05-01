import React from "react";
import { Redirect } from "@reach/router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem("unsplash_demo:access");
  console.log(Component);
  const renderedComponent = !!authToken ? (
    <Component {...rest} />
  ) : (
    <Redirect from="" to="login" noThrow />
  );
  return renderedComponent;
};

export default PrivateRoute;
