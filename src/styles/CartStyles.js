import styled from "styled-components";

export const FlexRowDiv = styled.div`
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

export const BillActionButton = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  &:focus {
    outline: none;
  }
`;
export const BillDetailsContainer = styled.div`
  height: 60%;
  width: 100%;
  background-color: #f4f5f7;
  overflow-y: scroll;
`;

export const CartWarpper = styled.div`
  width: 90%;
  margin: 2rem auto;
  padding: 0 2rem;
  display: flex;

  justify-content: space-between;
`;

export const OrderWrapper = styled.div`
  width: 65%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ItemContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  padding: 0.4rem;
  margin: 0.3rem;
`;

export const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  background-color: whitesmoke;
  border-radius: 70px;
`;

export const DishDetailConatiner = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const DishDetail = styled.div`
  margin-top: 0.7rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const DishField = styled.div`
  width: 100px;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  align-items: start;
`;
export const DishName = styled.li`
  font-size: 1rem;
  font-weight: 600;
  list-style: none;
`;

export const DishAction = styled.div`
  width: 20%;
  margin-left: 1.2rem;
`;
export const BillContainer = styled.div`
  width: 33%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.8rem;

  border-radius: 12px;
`;

export const CheckoutButton = styled.button`
  width: 50%;
  background-color: #672497;
  height: 3rem;
  border-radius: 0.6rem;
  color: white;
  border: none;
  &: hover {
    background-color: #c0abd4;
  }
  &:focus {
    outline: none;
  }
`;
export const ActionButton = styled.button`
  float: right;
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  color: white;
  &:hover {
    color: whitesmoke;
  }
  &:focus {
    outline: none;
  }
  border: none;
  border-radius: 7px;
  padding: 0.3rem 0.5rem;
`;
