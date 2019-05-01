import React from "react";

const GuestLayout = ({ children }) => (
  <div
    className="container is-fluid"
    style={{ height: "100vh", paddingTop: '25vh' }}
  >
    {children}
  </div>
);

export default GuestLayout;
