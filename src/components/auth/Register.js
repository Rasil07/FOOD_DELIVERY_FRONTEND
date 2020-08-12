import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { registerUser } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirm_password,
      address,
      contact_no,
    } = this.state;
    const newUser = {
      name,
      email,
      password,
      confirm_password,
      address,
      contact_no,
    };
    this.props.registerUser(newUser);
  }
  render() {
    return (
      <div
        className="container"
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div
          class="card rounded align-middle"
          style={{
            width: "600px",
            minWidth: "400px",
            margin: " auto",
            padding: "1.2rem",
          }}
        >
          <h3>Register</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.value}
                onChange={(e) => this.setState({ name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={this.state.value}
                onChange={(e) => this.setState({ email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.value}
                onChange={(e) => this.setState({ password: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm Password:</label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={this.state.value}
                onChange={(e) =>
                  this.setState({ confirm_password: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Contact_No</label>
              <input
                type="number"
                name="contact_no"
                id="contact_no"
                value={this.state.value}
                onChange={(e) => this.setState({ contact_no: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={this.state.value}
                onChange={(e) => this.setState({ address: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
