import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadDishes } from "../../redux/actions/dishActions";
import { addDish } from "../../redux/actions/cartActions";
import FoodImage from "../../img/food.png";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
} from "reactstrap";
import history from "../../utils/history";

class Dish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ordered_items: [],
    };
    this.handleOrder = this.handleOrder.bind(this);
  }
  componentDidMount() {
    this.props.loadDishes();
  }

  handleOrder(id) {
    if (this.props.isAuthenticated) {
      this.props.addDish(id);
    } else {
      history.push("/login");
    }
  }
  renderItems = () => {
    const data = this.props.dishes;
    const mapData = data.map((item, index) => (
      <Fragment key={item._id}>
        <Card
          style={{
            width: "15rem",
            margin: "1.5rem",
            borderRadius: "1.6rem",
            alignItems: "center",
          }}
        >
          <CardImg src={FoodImage} height="120px" width="150px" />
          <CardBody>
            <CardTitle>
              <strong>Dish:</strong>
              {item.name}
            </CardTitle>
            <CardText>
              <strong>Category:</strong> {item.category}
            </CardText>
            <CardText>
              <strong>Price:</strong> {item.price}
            </CardText>
            <Button color="info" onClick={() => this.handleOrder(item._id)}>
              Add to Cart
            </Button>
          </CardBody>
        </Card>
      </Fragment>
    ));
    return mapData;
  };
  render() {
    return (
      <Fragment>
        <div className="row d-flex justify-content-around">
          {this.props.dishes ? this.renderItems() : <li>No dishes found</li>}
        </div>
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
  };
};

export default connect(mapStateToProps, { loadDishes, addDish })(Dish);
