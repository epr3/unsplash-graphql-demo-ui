import React from "react";

function GuestLayout(WrappedComponent) {
  return class extends React.Component {
    state = {
      hasError: false
    };
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
    componentDidCatch(e) {
      console.error(e);
    }
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
      return (
        <div
          className="container is-fluid"
          style={{ height: "100vh", paddingTop: "25vh" }}
        >
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

export default GuestLayout;
