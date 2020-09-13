import styled from "styled-components";

export const LI = styled.li`
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  list-style: none;
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
  color: ${(props) => (props.color ? props.color : "#111820")};
`;
export const TableWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
