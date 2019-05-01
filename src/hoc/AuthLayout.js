import React from "react";

import Header from "../containers/Header";

function AuthLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <div className="container is-fluid">
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export default AuthLayout;
