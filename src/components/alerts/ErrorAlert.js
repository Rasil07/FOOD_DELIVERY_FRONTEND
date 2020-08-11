import React, { Component, Fragment } from "react";
import { Alert } from "reactstrap";
export default class ErrorAlert extends Component {
  handleErrors(errors) {
    if (Array.isArray(errors)) {
      let errorArray = errors;

      const listErrors = errorArray.map((error) => (
        <Alert color="danger">
          <p>{error}</p>
        </Alert>
      ));
      return <ul>{listErrors}</ul>;
    } else {
      return <ul>{errors}</ul>;
    }
  }
  render() {
    return <Fragment>{this.handleErrors(this.props.message)}</Fragment>;
  }
}
