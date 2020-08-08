import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadDishes } from "../../redux/actions/dishActions";
import { addDish } from "../../redux/actions/cartActions";
import FoodImage from "../../img/food.png";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import history from "../../utils/history";
class Dish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ordered_items: [],
    };
    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(id) {
    console.log(id);
    if (this.props.isAuthenticated) {
      this.props.addDish(id);
    } else {
      history.push("/login");
    }
  }
  renderItems = () => {
    const data = this.props.dishes;
    const mapData = data.map((item, index) => (
      <Fragment key={item.id}>
        <div className="card" style={{ width: "250px" }}>
          <img className="card-img-top" src={FoodImage} alt="Card image cap" />
          <div className="card-body">
            <h8 className="card-title">
              Name:<strong>{item.name}</strong>
            </h8>
            <p className="card-text">
              Price: <strong>{item.price}</strong>
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.handleOrder(item._id)}
          >
            Order
          </button>
        </div>
      </Fragment>
    ));
    return mapData;
  };
  render() {
    return (
      <div className="container">
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {this.props.dishes ? this.renderItems() : <li>No dishes found</li>}
        </div>
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
  };
};

export default connect(mapStateToProps, { loadDishes, addDish })(Dish);
