import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import React, { Component } from "react";
import App from "./App";
import history from "./utils/history";
class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default Root;
