import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { placeOrder, clearCart } from "../../redux/actions/cartActions";
class Cart extends Component {
  handleClearOrder = () => {
    this.props.clearCart();
  };
  handleSubmitOrder = () => {
    this.props.placeOrder(this.props.cart);
  };
  renderCartItems = () => {
    let addedItemList = this.props.cart.addedItems;
    const dish = [];
    for (const [index, item] of addedItemList.entries()) {
      dish.push(
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
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
            </tr>
          </thead>
          <tbody>{dish}</tbody>
        </table>
        <label>Total Price: {this.props.cart.total}</label>
        <button className="btn btn-primary" onClick={this.handleSubmitOrder}>
          BUY
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
export default connect(mapStateToProps, { placeOrder, clearCart })(Cart);