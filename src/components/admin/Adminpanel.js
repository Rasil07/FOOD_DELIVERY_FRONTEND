import React, { Component } from "react";
import { connect } from "react-redux";

class Adminpanel extends Component {
  render() {
    return <li>Adminpanel</li>;
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Adminpanel);
