import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../utils/history";
import Unauthorized from "../Unauthorized";

class Adminpanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isAdmin) {
      return (
        <div>
          <li>Hello Admin</li>
        </div>
      );
    } else {
      return <Unauthorized />;
    }
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Adminpanel);
