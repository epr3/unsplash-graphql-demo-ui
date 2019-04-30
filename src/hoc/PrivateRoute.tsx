import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";

interface Props extends RouteComponentProps {
  component: (new (props: any) => React.Component) | React.FC;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem("unsplash_demo:access");
  const renderedComponent = !!authToken ? (
    <Component {...rest} />
  ) : (
    <Redirect from="" to="login" noThrow />
  );
  return renderedComponent;
};

export default PrivateRoute;
