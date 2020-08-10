import React, { Component, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle";

import Login from "./components/Login";

import Dish from "./components/dish/Dish";

import Navbar from "./components/Navbar";

import { Router, Route, Switch } from "react-router-dom";

import Register from "./components/Register";

import { AdminPrivateRoute } from "./components/AdminPrivateRoute.jsx";

import { UnloggedRoute } from "./components/UnloggedRoute.jsx";

import { LoggedRoute } from "./components/loggedRoute.jsx";

import history from "./utils/history";

import { loadUser } from "./redux/actions/authActions";

import { loadDishes } from "./redux/actions/dishActions";

import Adminpanel from "./components/admin/Adminpanel";

import Unauthorized from "./components/Unauthorized";

import { connect } from "react-redux";

import { Alert } from "reactstrap";

import Cart from "./components/dish/Cart";

function Message(props) {
  let message = props.message.message;

  return (
    <Alert color="success">
      <p>{message}</p>
    </Alert>
  );
}

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadDishes();
  }

  render() {
    return (
      <Fragment>
        <Navbar />

        {this.props.message.message ? (
          <Message message={this.props.message} />
        ) : null}
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Dish} />
            <UnloggedRoute
              exact
              path="/login"
              component={Login}
              isAuthenticated={this.props.isAuthenticated}
            />

            <UnloggedRoute
              exact
              path="/register"
              component={Register}
              isAuthenticated={this.props.isAuthenticated}
            />

            <AdminPrivateRoute
              exact
              path="/administration"
              component={Adminpanel}
              isAdmin={this.props.isAdmin}
              {...this.props}
            />

            <LoggedRoute
              exact
              path="/cart"
              component={Cart}
              isAuthenticated={this.props.isAuthenticated}
            />

            <Route exact path="/unauthorized" component={Unauthorized} />
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
  dishes: state.dishes,
  cart: state.cart,
  message: state.message,
});
export default connect(mapStateToProps, { loadUser, loadDishes })(App);
