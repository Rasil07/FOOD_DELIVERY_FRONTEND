import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  placeOrder,
  clearCart,
  changeItemQuantity,
  deleteItem,
} from "../../redux/actions/cartActions";
class Cart extends Component {
  handleClearOrder = () => {
    this.props.clearCart();
  };
  handleSubmitOrder = () => {
    this.props.placeOrder(this.props.cart);
  };
  handleQuantityChange = (e) => {
    this.props.changeItemQuantity(e.target.id, e.target.value);
  };
  handleDeleteItem = (e) => {
    const id = e.target.value;
    this.props.deleteItem(id);
  };
  renderCartItems = () => {
    let addedItemList = this.props.cart.addedItems;
    const dish = [];
    for (const [index, item] of addedItemList.entries()) {
      dish.push(
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>
            {" "}
            <input
              type="number"
              className="form-control"
              defaultValue={item.quantity}
              min="1"
              value={this.value}
              id={item._id}
              style={{ maxWidth: "100px" }}
              onChange={(e) => this.handleQuantityChange(e)}
            />{" "}
          </td>
          <td>{item.price}</td>
          <td>
            <button
              className="btn btn-danger"
              value={item._id}
              onClick={this.handleDeleteItem}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
    return (
      <Fragment>
        <div
          style={{
            padding: "10px",
            height: "70px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <h4
            style={{
              marginRight: "20px",
            }}
          >
            Your Cart
          </h4>
          <button className="btn btn-danger" onClick={this.handleClearOrder}>
            Clear
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dish</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>{dish}</tbody>
        </table>
        <label>Total Price: {this.props.cart.total}</label>
        <button
          className="btn btn-primary ml-auto"
          onClick={this.handleSubmitOrder}
        >
          Place Order
        </button>
      </Fragment>
    );
  };
  renderEmptyCart = () => {
    return (
      <Fragment>
        <h1>Your Cart</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dish</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
        </table>
        <h4>Nothing in cart. Place your order first</h4>
        <label>Total Price: {this.props.cart.total}</label>
      </Fragment>
    );
  };
  render() {
    return (
      <div>
        {this.props.cart.addedItems.length > 0
          ? this.renderCartItems()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    dishes: state.dishes.dishes,
    cart: state.cart,
  };
};
export default connect(mapStateToProps, {
  placeOrder,
  clearCart,
  changeItemQuantity,
  deleteItem,
})(Cart);
