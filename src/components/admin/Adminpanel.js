import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Dish from "./Dish";
import Order from "./Order";
import Sidebar from "./Sidebar";
class Adminpanel extends Component {
  render() {
    const { match } = this.props; // coming from React Router v4.

    return (
      <Fragment>
        <div
          className="container-fluid"
          style={{ display: "flex", padding: "0" }}
        >
          <Sidebar props={this.props} />

          <Switch>
            <Route
              exact
              path={`${match.path}/dashboard`}
              component={Dashboard}
            />
            <Route exact path={`${match.path}/dish`} component={Dish} />
            <Route exact path={`${match.path}/order`} component={Order} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Adminpanel);
