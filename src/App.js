import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "./components/Login";
import Dish from "./components/dish/Dish";
import Navbar from "./components/Navbar";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";

import history from "./utils/history";
import { loadUser } from "./redux/actions/authActions";
import { loadDishes } from "./redux/actions/dishActions";
import { returnError } from "./redux/actions/errorActions";
import Adminpanel from "./components/admin/Adminpanel";

import Unauthorized from "./components/Unauthorized";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount(props) {
    this.props.loadUser();
    this.props.loadDishes();
  }

  render() {
    return (
      <Router history={history}>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dish} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <Route
              exact
              path="/administration"
              component={Adminpanel}
              {...this.props}
            />

            <Route exact path="/unauthorized" component={Unauthorized} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isAdmin: state.auth.isAdmin,
  dishes: state.dishes,
  cart: state.cart,
});
export default connect(mapStateToProps, { loadUser, loadDishes })(App);
