import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadDishes } from "../../redux/actions/dishActions";
import { addDish } from "../../redux/actions/cartActions";
import FoodImage from "../../img/food.png";
import styled, { css } from "styled-components";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Dish extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleOrder = this.handleOrder.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    this.props.loadDishes();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dishes !== this.props.dishes) {
      this.setState({ dishes: this.props.dishes });
    }
  }

  handleOrder(id) {
    if (this.props.isAuthenticated) {
      this.props.addDish(id);
    } else {
      this.props.history.push("/login");
    }
  }
  handleCategoryChange(category) {
    const allDishes = this.props.dishes;
    switch (category) {
      case true: {
        const vegDishes = allDishes.filter((dish) => {
          return dish.category === "Veg";
        });
        this.setState({
          dishes: vegDishes,
        });
        return;
      }
      case false: {
        const nonVegDishes = allDishes.filter((dish) => {
          return dish.category === "Non Veg";
        });
        this.setState({
          dishes: nonVegDishes,
        });
        return;
      }
      default: {
        this.setState({
          dishes: allDishes,
        });
        return;
      }
    }
  }

  renderItems = (dishes) => {
    const data = dishes;
    const mapData = data.map((item, index) => (
      <Fragment key={item._id}>
        <Card
          style={{
            width: "13rem",
            borderRadius: "1rem",
            alignItems: "center",
            margin: ".2rem",
          }}
        >
          <CardImg src={FoodImage} height="120px" width="120px" />
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
    const DropdwonButton = (props) => {
      const [dropdownOpen, setOpen] = useState(false);

      const toggle = () => setOpen(!dropdownOpen);

      return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret color="white">
            Category
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.handleCategoryChange(true)}>
              Veg
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => this.handleCategoryChange(false)}>
              Non Veg
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => this.handleCategoryChange()}>
              All
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      );
    };
    return (
      <Fragment>
        <Wrapper>
          <div style={{ margin: "1rem 0 1rem auto", width: "20%" }}>
            <DropdwonButton />
          </div>

          {this.state.dishes ? (
            <DishCardContainer>
              {this.renderItems(this.state.dishes)}
            </DishCardContainer>
          ) : (
            <li>No dishes found</li>
          )}
        </Wrapper>
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

const DishCardContainer = styled.div`
  width: 95%;
  height: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;
