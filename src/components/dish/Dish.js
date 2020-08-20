import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadDishes } from "../../redux/actions/dishActions";
import { addDish } from "../../redux/actions/cartActions";
import FoodImage from "../../img/food.png";
import styled from "styled-components";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DishInfo,
  AddButton,
  DishCardContainer,
  Wrapper,
  DishCard,
  DishDetail,
} from "../../styles/DishStyles";

import { LI } from "../../styles/MainStyles";
import {
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
      this.setState({ dishes: this.props.dishes, selected: "All" });
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
          selected: "Veg",
        });
        return;
      }
      case false: {
        const nonVegDishes = allDishes.filter((dish) => {
          return dish.category === "Non Veg";
        });
        this.setState({
          dishes: nonVegDishes,
          selected: "Non Veg",
        });
        return;
      }
      default: {
        this.setState({
          dishes: allDishes,
          selected: "All",
        });
        return;
      }
    }
  }

  renderItems = (dishes) => {
    const data = dishes;
    const mapData = data.map((item, index) => (
      <Fragment key={item._id}>
        <DishCard img={FoodImage}>
          <DishDetail category={item.category}>
            <AddButton onClick={() => this.handleOrder(item._id)}>
              <FontAwesomeIcon icon={faCartArrowDown} />
            </AddButton>
            <DishInfo>
              <LI size="18px" weight="600" color="white">
                {item.name}
              </LI>
              <LI color="white">Category: {item.category}</LI>
              <LI
                style={{
                  margin: "0 .5rem 0 auto",
                  padding: "0 .5rem .5rem 0",
                }}
                color="white"
              >
                Rs: {item.price}/-
              </LI>
            </DishInfo>
          </DishDetail>
        </DishCard>
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
          <div
            style={{
              margin: "1rem 1.4rem 1rem auto",
              width: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <LI>
              Selected: <span>{this.state.selected}</span>
            </LI>
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
