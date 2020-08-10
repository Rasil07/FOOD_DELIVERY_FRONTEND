import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AdminPrivateRoute = ({
  component: Component,
  isAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAdmin) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{ pathname: "/unauthorized", state: { from: props.location } }}
        />
      );
    }}
  />
);
