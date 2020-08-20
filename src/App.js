import React, { Component, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle";

import Dish from "./components/dish/Dish";

import Navbar from "./components/Navbar";

import { Route, Switch, withRouter } from "react-router-dom";

import Register from "./components/auth/Register";

import Login from "./components/auth/Login";

import { AdminPrivateRoute } from "./components/routeHandler/AdminPrivateRoute.jsx";

import { UnloggedRoute } from "./components/routeHandler/UnloggedRoute.jsx";

import { LoggedRoute } from "./components/routeHandler/loggedRoute.jsx";

import history from "./utils/history";

import { loadUser } from "./redux/actions/authActions";

import { loadDishes } from "./redux/actions/dishActions";

import Adminpanel from "./components/admin/Adminpanel";

import Unknown from "./components/badRoutes/unknown";

import { connect } from "react-redux";

import { Alert } from "reactstrap";

import Cart from "./components/dish/Cart";

import ErrorAlerrt from "./components/alerts/ErrorAlert";

import SuccessAlert from "./components/alerts/SuccessAlert";

import styled from "styled-components";

import Home from "./components/Home";

import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: [],
    };
  }
  componentDidMount() {
    this.props.loadUser();
  }
  componentDidUpdate(prevProps) {
    let error = this.props.error;
    if (error !== prevProps.error) {
      this.setState({
        msg: error.msg,
      });
    }
  }

  render() {
    return (
      <BodyWrapper>
        <Navbar />
        <FoaltingAlert>
          {this.state.msg && this.state.msg.length > 0 ? (
            <ErrorAlerrt message={this.props.error.msg} />
          ) : null}
          {this.props.message.message.length > 0 ? (
            <SuccessAlert message={this.props.message.message} />
          ) : null}
        </FoaltingAlert>
        <Switch>
          <Route exact path="/" component={Home} />
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
          <Route exact path="/dish" component={Dish} />
          <LoggedRoute
            exact
            path="/cart"
            component={Cart}
            isAuthenticated={this.props.isAuthenticated}
          />
          <AdminPrivateRoute
            path="/admin"
            component={Adminpanel}
            isAdmin={this.props.isAdmin}
          />
          <Route path="*" component={Unknown} />
        </Switch>
      </BodyWrapper>
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
  error: state.error,
});
export default connect(mapStateToProps, { loadUser, loadDishes })(
  withRouter(App)
);

const FoaltingAlert = styled.div`
  right: 0;
  position: fixed;
  padding: 0.8rem;
  z-index: 9;
`;
const BodyWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;
