import React, { Component, Fragment } from "react";
import { Alert } from "reactstrap";
export default class SuccessAlert extends Component {
  handleMessage(messages) {
    let messageArray = messages;

    const listMessage = messageArray.map((message) => (
      <Alert color="success">
        <p>{message}</p>
      </Alert>
    ));
    return <ul>{listMessage}</ul>;
  }
  render() {
    return <Fragment>{this.handleMessage(this.props.message)}</Fragment>;
  }
}
