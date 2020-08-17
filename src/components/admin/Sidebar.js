import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

export default function Sidebar(props) {
  const { match } = props.props;
  const [toggled, setToggle] = useState(false);
  return (
    <Fragment>
      <SidebarContainer toggled={toggled}>
        <SidebarHeaderContainer>
          <SidebarHeading>Food Delivery</SidebarHeading>
          <SidebarToggler onClick={() => setToggle(!toggled)}>
            Toggle
          </SidebarToggler>
        </SidebarHeaderContainer>
        <SidebarUl>
          <SidebarListContainer>
            <Link to={`${match.url}/dashboard`}>Dashboard</Link>

            <Link to={`${match.url}/dish`}>Dish</Link>

            <Link to={`${match.url}/order`}>Order</Link>
          </SidebarListContainer>
        </SidebarUl>
      </SidebarContainer>
    </Fragment>
  );
}

const SidebarContainer = styled.div`
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  width: 20%;
  flex-direction: column;
  background-color: #ffffff;
  color: #5e5c6c;
  border: 1px solid magenta;
  height: 100%;
  transition-property: width;
  transition-duration: 0.5s;
  ${({ toggled }) =>
    toggled &&
    `
    width: 6%
  `};
`;

// const AniamtedSidebar = animated(SidebarContainer);

const SidebarHeaderContainer = styled.div`
  height: 9rem;
  width: 100%;
  background-color: #e9f1f4;
  padding: 0.3rem 1rem;
  display flex;

`;

const SidebarHeading = styled.div`
  font-size: 1.2rem;
`;

const SidebarListContainer = styled.div`
  font-size: 1rem;
  padding: 0;
  border: 1px solid yellow;
  display: flex;
  flex-direction: column;
`;

const SidebarUl = styled.ul`
  padding: 0;
  list-style: none;
  line-height: 3rem;
`;

const SidebarLI = styled.li`
  border: 1px solid red;
  padding: 0.2rem 0.3rem;
  text-decoration: none;
  a {
    text-decoration: none;
    color: #5e5c6c;
  }
`;
const SidebarToggler = styled.button`
  position: absolute;
  right: 1rem;
  width: 4.3rem;
  height: 2.5rem;
  background-color: white;
  border: 1px solid grey;
  border-radius: 0.4rem;
  font-size: 0.9rem;
  &:hover {
    background-color: whitesmoke;
  }
`;
