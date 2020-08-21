import React, { Component, Fragment, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import AddDishModal from "./modals/dish/addDishModal";
import styled from "styled-components";
import { connect } from "react-redux";
import { loadDishes, deleteDish } from "../../redux/actions/dishActions";
import { FlexRowDiv, ActionButton } from "../../styles/CartStyles";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDishModal from "./modals/dish/deleteDishModal";
class Dish extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadDishes();
  }

  renderDishList() {
    const allDishes = this.props.dishes;
    const dish = allDishes.map((item, index) => (
      <tr key={index}>
        <td scope="row">{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>
          <ActionButton background="#febf63">
            <FontAwesomeIcon icon={faEdit} />{" "}
          </ActionButton>
        </td>
        <td>
          {" "}
          <DeleteDishModal item={item} />
        </td>
      </tr>
    ));
    return dish;
  }
  render() {
    return (
      <Fragment>
        {" "}
        <h1>Dish</h1>
        <AddDishModal />
        <DishtableWrapper>
          <Table borderless hover responsive size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Dish</th>
                <th>Category</th>
                <th>Price</th>
                <th colspan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dishes && this.props.dishes.length
                ? this.renderDishList()
                : `No dishes`}
            </tbody>
          </Table>
        </DishtableWrapper>
      </Fragment>
    );
  }
}

const DishtableWrapper = styled.div`
  width: 100%;

  overflow-y: scroll;
`;
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    dishes: state.dishes.dishes,
  };
};
export default connect(mapStateToProps, { loadDishes, deleteDish })(Dish);
