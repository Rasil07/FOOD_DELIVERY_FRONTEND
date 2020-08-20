import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { LI } from "../../styles/MainStyles";
import {
  faArrowRight,
  faArrowLeft,
  faChartArea,
  faUtensils,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar(props) {
  const { match } = props.props;
  const [toggled, setToggle] = useState(false);
  return (
    <Fragment>
      <SidebarContainer toggled={toggled}>
        <SidebarHeaderContainer>
          <SidebarToggler onClick={() => setToggle(!toggled)}>
            {toggled ? (
              <FontAwesomeIcon icon={faArrowRight} />
            ) : (
              <FontAwesomeIcon icon={faArrowLeft} />
            )}
          </SidebarToggler>
        </SidebarHeaderContainer>
        <SidebarUl>
          {!toggled ? (
            <Fragment>
              <SidebarListContainer>
                <LI size="20px">
                  <Anchor to={`${match.url}`}>
                    <FontAwesomeIcon icon={faChartArea} />
                    <span>&nbsp;</span>
                    Dashboard
                  </Anchor>
                </LI>
                <LI size="20px">
                  <Anchor to={`${match.url}/dish`}>
                    <FontAwesomeIcon icon={faUtensils} />
                    <span>&nbsp;</span>
                    Dish
                  </Anchor>
                </LI>
                <LI size="20px">
                  <Anchor to={`${match.url}/order`}>
                    <FontAwesomeIcon icon={faCashRegister} />
                    <span>&nbsp;</span>
                    Order
                  </Anchor>
                </LI>
              </SidebarListContainer>
            </Fragment>
          ) : (
            <SidebarListContainerToggeled>
              <LI size="20px">
                <Link to={`${match.url}`}>
                  <FontAwesomeIcon icon={faChartArea} />
                </Link>
              </LI>
              <LI size="20px">
                <Link to={`${match.url}/dish`}>
                  <FontAwesomeIcon icon={faUtensils} />
                </Link>
              </LI>
              <LI size="20px">
                <Link to={`${match.url}/order`}>
                  <FontAwesomeIcon icon={faCashRegister} />
                </Link>
              </LI>
            </SidebarListContainerToggeled>
          )}
        </SidebarUl>
      </SidebarContainer>
    </Fragment>
  );
}

const SidebarContainer = styled.div`
  position: relative;
  left: 0;
  display: flex;
  width: 20%;
  border-right: 1px groove #e1e1e1;
  flex-direction: column;
  background-color: #ffffff;
  color: #5e5c6c;
  height: 100%;
  overflow-y: scroll;
  transition-property: width;
  transition-duration: 0.5s;
  ${({ toggled }) =>
    toggled &&
    `
    width: 6%
  `};
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;
const Anchor = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const SidebarHeaderContainer = styled.div`
  height: 10%;
  width: 100%;  
  padding: 0.3rem 1rem;
  display flex;
`;
const SidebarListContainer = styled.div`
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SidebarListContainerToggeled = styled.div`
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SidebarUl = styled.ul`
  padding: 0;
  list-style: none;
  line-height: 4rem;
`;

const SidebarToggler = styled.button`
  position: absolute;
  right: 1rem;
  width: 4.3rem;
  height: 2.5rem;
  border: none;
  color: #ff7171;
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffaa71;
    font-size: 1.4rem;
  }
  background-color: white;
`;
