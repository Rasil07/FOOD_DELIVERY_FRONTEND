import React from "react";
import { Route, Redirect } from "react-router-dom";
import Unauthorized from "../badRoutes/unauthorized";
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
      return <Unauthorized />;
    }}
  />
);
