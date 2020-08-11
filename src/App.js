import React, { Component, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle";

import Login from "./components/Login";

import Dish from "./components/dish/Dish";

import Navbar from "./components/Navbar";

import { Router, Route, Switch, withRouter } from "react-router-dom";

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

import ErrorAlerrt from "./components/alerts/ErrorAlert";

import SuccessAlert from "./components/alerts/SuccessAlert";

import styled from "styled-components";

// import ModalExample from "./components/userAuthModal";

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
      // console.log("New error", error.msg);
      this.setState({
        msg: error.msg,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <FoaltingAlert>
          {this.state.msg && this.state.msg.length > 0 ? (
            <ErrorAlerrt message={this.props.error.msg} />
          ) : null}
          {this.props.message.message.length > 0 ? (
            <SuccessAlert message={this.props.message.message} />
          ) : null}
        </FoaltingAlert>

        <div className="container">
          <Switch>
            <Route exact path="/dish" component={Dish} />
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
  error: state.error,
});
export default connect(mapStateToProps, { loadUser, loadDishes })(App);

const FoaltingAlert = styled.div`
  right: 0;
  position: fixed;
  padding: 0.8rem;
  z-index: 9;
`;
