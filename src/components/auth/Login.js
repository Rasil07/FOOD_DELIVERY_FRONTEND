import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";
import { Alert } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const newUser = { email, password };
    this.props.loginUser(newUser);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

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
            maxWidth: "350px",
            minWidth: "200px",
            margin: " auto",
            padding: "1.2rem",
          }}
        >
          <h3>Login</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => this.setState({ email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                LogIn
              </button>
              <p>
                Haven't Regstered? Then
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
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

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
