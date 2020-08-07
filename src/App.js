import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";

import history from "./utils/history";
import { loadUser } from "./redux/actions/authActions";
import { returnError } from "./redux/actions/errorActions";
import Adminpanel from "./components/admin/Adminpanel";

import Unauthorized from "./components/Unauthorized";

import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <Router history={history}>
        <Navbar />
        <div className="container">
          <Switch>
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
});
export default connect(mapStateToProps, { loadUser })(App);
