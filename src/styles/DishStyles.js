import styled from "styled-components";

export const DishInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: space-between;
`;

export const AddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px whitesmoke;
  margin: -20px auto 0px auto;
  background-color: #ff417f;
  color: white;
  border: none;
  &:hover {
    width: 52px;
    height: 52px;
  }
  &:focus {
    outline: none;
  }
`;

export const DishCardContainer = styled.div`
  width: 95%;
  height: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

export const DishCard = styled.div`
  width: 15rem;
  height: 19rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${(props) => props.img});
  background-position: top;
  background-size: 80%;
  background-repeat: no-repeat;
  background-color: #f8f9fb;
`;

export const DishDetail = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto;
  border-top-left-radius: 400px 100px;
  border-top-right-radius: 400px 100px;
  background-color: ${(props) =>
    props.category === "Veg" ? "#16db93" : "#0db39e"};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
