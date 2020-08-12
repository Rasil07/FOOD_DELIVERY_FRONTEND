import React from "react";
import { Route, Redirect } from "react-router-dom";

export const UnloggedRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }
      return <Component {...props} />;
    }}
  />
);
