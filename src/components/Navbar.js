import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      isAdmin: null,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    this.setState({
      name: "",
      id: "",
      isAdmin: null,
    });
    this.props.logout();
  }
  componentDidUpdate(prevProps) {
    let { user } = this.props;
    if (user !== prevProps.user && user != null) {
      this.setState({
        name: user.decoded.data.name,
        id: user.decoded.data.id,
        isAdmin: user.decoded.data.isAdmin,
      });
    }
  }
  AuthenticatedLinks() {
    return (
      <ul className="navbar-nav ">
        <li className="nav-item active">
          <Link to="/" className="nav-link" href="#">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-link">Welcome {this.state.name}</li>
        {this.state.isAdmin === true ? (
          <li className="nav-item">
            <Link to="/administration" className=" nav-link">
              AdminPanel
            </Link>
          </li>
        ) : null}
        <li className="nav-item">
          <Link to="/" className=" btn btn-danger" onClick={this.handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }
  UnauthenticatedLinks() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/" className="nav-link" href="#">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Food Delivery
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {this.state.name
              ? this.AuthenticatedLinks()
              : this.UnauthenticatedLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapPropsToState = (state) => ({
  user: state.auth.user,
});

export default connect(mapPropsToState, { logout })(Navbar);
