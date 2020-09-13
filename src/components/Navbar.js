import React, { Component, Fragment } from "react";
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
      <Fragment>
        {this.state.isAdmin === true ? (
          <li className="nav-item">
            <Link to="/admin" className=" nav-link">
              AdminPanel
            </Link>
          </li>
        ) : null}
        <li className="nav-item ">
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </li>

        <li className=" dropdown nav-item" style={{ marginRight: "1.2rem" }}>
          <Link
            to="/"
            className=" dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            Welcome {this.state.name}
            <span className="caret"></span>
          </Link>
          <ul
            className="dropdown-menu"
            style={{
              background: "white",
              border: "none",
              backgroundColor: "#f8f9fb",
            }}
          >
            <Link to="/" className="dropdown-item" onClick={this.handleLogout}>
              Logout
            </Link>
          </ul>
        </li>
      </Fragment>
    );
  }

  UnauthenticatedLinks() {
    return (
      <Fragment>
        <li className="nav-item ">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </Fragment>
    );
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light sticky-top"
        style={{ height: "10vh", minHeight: "70px" }}
      >
        <Link to="/" className="navbar-brand ">
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
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/dish" className="nav-link">
                Menu
              </Link>
            </li>
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
  isAdmin: state.auth.isAdmin,
});

export default connect(mapPropsToState, { logout })(Navbar);
