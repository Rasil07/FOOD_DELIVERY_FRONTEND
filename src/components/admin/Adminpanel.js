import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Dish from "./Dish";
import Order from "./Order";
import Sidebar from "./Sidebar";
import styled from "styled-components";

class Adminpanel extends Component {
  render() {
    const { match } = this.props; // coming from React Router v4.

    return (
      <AdminWrapper>
        <Sidebar props={this.props} />
        <MainContentWrapper>
          <Switch>
            <Route exact path={`${match.path}/`} component={Dashboard} />
            <Route exact path={`${match.path}/dish`} component={Dish} />
            <Route exact path={`${match.path}/order`} component={Order} />
          </Switch>
        </MainContentWrapper>
      </AdminWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isAdmin: state.auth.isAdmin,
});

const AdminWrapper = styled.div`
  margin: 0;
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
`;
const MainContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: 14px;
  padding: 1rem;
`;
export default connect(mapStateToProps)(Adminpanel);
