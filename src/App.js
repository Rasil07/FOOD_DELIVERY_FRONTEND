import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import { Provider } from "react-redux";
import store from "./redux/store";
import history from "./utils/history";
import { loadUser } from "./redux/actions/authActions";
import { returnError } from "./redux/actions/errorActions";
import Adminpanel from "./components/admin/Adminpanel";
import requireAuth from "./components/Router";
import Unauthorized from "./components/Unauthorized";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>

              <Route
                exact
                path="/administration"
                component={requireAuth(Adminpanel)}
              ></Route>
              <Route
                exact
                path="/unauthorized"
                component={Unauthorized}
              ></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
