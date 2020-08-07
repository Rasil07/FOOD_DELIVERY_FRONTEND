import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import history from "../utils/history";
import { returnError } from "../redux/actions/errorActions";
export default function (ComposedComponent) {
  class Authenticated extends Component {
    componentWillMount() {
      if (this.props.user === null) {
        history.push("/unauthorized");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  Authenticated.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
  };
  const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
    };
  };
  return connect(mapStateToProps, { returnError })(Authenticated);
}
