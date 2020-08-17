import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FoodImage from "../../img/food.png";
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

  handleDeleteItem = (id) => {
    this.props.deleteItem(id);
  };

  renderCartItems = () => {
    let addedItemList = this.props.cart.addedItems;
    const dish = [];
    for (const [index, item] of addedItemList.entries()) {
      dish.push(
        <Fragment key={item._id}>
          <ItemContainer>
            <ImageContainer src={FoodImage} />
            <DishDetailConatiner>
              <DishName>
                {index + 1} {item.name}
              </DishName>
              <DishDetail>
                <DishField>
                  <label>Category:</label>
                  <LI size="20px" weight="500">
                    {item.category}
                  </LI>
                </DishField>

                <DishField>
                  <LI>Quantity :</LI>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={item.quantity}
                    min="1"
                    value={this.value}
                    id={item._id}
                    style={{ maxWidth: "100px" }}
                    onChange={(e) => this.handleQuantityChange(e)}
                  />
                </DishField>
                <DishField>
                  <label htmlFor=""> Price per Unit:</label>
                  <LI size="22px" weight="700">
                    {item.price}
                  </LI>
                </DishField>
              </DishDetail>
            </DishDetailConatiner>
            <DishAction>
              <ActionButton
                className="btn"
                background="#fe8a71"
                onClick={() => this.handleDeleteItem(item._id)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </ActionButton>
            </DishAction>
          </ItemContainer>
          <div className="dropdown-divider"></div>
        </Fragment>
      );
    }
    return <Fragment>{dish}</Fragment>;
  };
  renderEmptyCart = () => {
    return (
      <Fragment>
        <h4>Nothing in cart. Place your order first!!!</h4>
      </Fragment>
    );
  };
  render() {
    return (
      <Fragment>
        <h4
          style={{
            width: "fit-content",
            padding: ".5rem .7rem",
            margin: "1rem auto",
            textAlign: "center",
            backgroundColor: "#869260",
            color: "white",
            fontWeight: "700",
          }}
        >
          Your Shopping Cart
        </h4>

        <CartWarpper>
          <OrderWrapper>
            {this.props.cart.addedItems.length > 0
              ? this.renderCartItems()
              : this.renderEmptyCart()}
          </OrderWrapper>
          <BillContainer>
            <BillActionButton>
              <ActionButton
                background={"#e8505c"}
                onClick={this.handleClearOrder}
              >
                Clear All Items
              </ActionButton>
            </BillActionButton>
            <div className="dropdown-divider"></div>
            <BillDetailsContainer>
              <FlexRowDiv style={{ height: "40px", padding: ".6rem 1.2rem" }}>
                <LI size="16px" weight="600">
                  Total Dish Cost
                </LI>
                <LI size="16px" weight="600">
                  {this.props.cart.total}
                </LI>
              </FlexRowDiv>
              <div className="dropdown-divider"></div>
              <FlexRowDiv style={{ height: "40px", padding: ".6rem 1.2rem" }}>
                <LI size="16px" weight="600">
                  Delivery Cost
                </LI>
                <LI size="16px" weight="600">
                  0
                </LI>
              </FlexRowDiv>
              <div className="dropdown-divider"></div>
              <FlexRowDiv style={{ height: "60px", padding: ".6rem 1.2rem" }}>
                <LI size="20px" weight="600">
                  Grand Total Price
                </LI>
                <LI size="20px" weight="600">
                  {this.props.cart.total}
                </LI>
              </FlexRowDiv>
            </BillDetailsContainer>

            <div className="dropdown-divider"></div>
            <FlexRowDiv>
              <LI size="16px" weight="600" style={{ padding: ".5rem 0rem" }}>
                <Link
                  to="/dish"
                  style={{
                    textAlign: "center",
                    height: "100%",
                    color: "#672497",
                  }}
                >
                  Continue Shopping
                </Link>
              </LI>
              <CheckoutButton
                id="payment-button"
                onClick={this.handleSubmitOrder}
              >
                Checkout
              </CheckoutButton>
            </FlexRowDiv>
          </BillContainer>
        </CartWarpper>
      </Fragment>
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
    config: state.khaltiConfig,
  };
};
export default connect(mapStateToProps, {
  placeOrder,
  clearCart,
  changeItemQuantity,
  deleteItem,
})(Cart);

const LI = styled.li`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  list-style: none;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.5rem;
  ${(props) =>
    props.border
      ? {
          borderWidth: props.border,
          borderRight: "none",
          borderLeft: "none",
          borderStyle: props.borderStyle ? props.borderStyle : "none",
        }
      : null}
`;

const BillActionButton = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
`;
const BillDetailsContainer = styled.div`
  height: 60%;
  width: 100%;
  background-color: #f4f5f7;
  overflow-y: scroll;
`;

const CartWarpper = styled.div`
  width: 90%;
  margin: 2rem auto;
  padding: 0 2rem;
  display: flex;

  justify-content: space-between;
`;

const OrderWrapper = styled.div`
  width: 65%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  padding: 0.4rem;
  margin: 0.3rem;
`;

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  background-color: whitesmoke;
  border-radius: 70px;
`;

const DishDetailConatiner = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const DishDetail = styled.div`
  margin-top: 0.7rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DishField = styled.div`
  width: 100px;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  align-items: start;
`;
const DishName = styled.li`
  font-size: 1rem;
  font-weight: 600;
  list-style: none;
`;

const DishAction = styled.div`
  width: 20%;
  margin-left: 1.2rem;
`;
const BillContainer = styled.div`
  width: 33%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.8rem;

  border-radius: 12px;
`;

const CheckoutButton = styled.button`
  width: 50%;
  background-color: #672497;
  height: 3rem;
  border-radius: 0.6rem;
  color: white;
  border: none;
  &: hover {
    background-color: #c0abd4;
  }
`;
const ActionButton = styled.button`
  float: right;
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  color: white;
  &:hover {
    color: whitesmoke;
  }
  border: none;
  border-radius: 7px;
  padding: 0.3rem 0.5rem;
`;
