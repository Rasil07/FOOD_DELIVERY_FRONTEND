import React, { useState, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormText,
  Table,
} from "reactstrap";

import { TableWrapper } from "../../../../styles/MainStyles";
import { Link } from "react-router-dom";

const renderItems = (props) => {
  let arrayItems = props.list;
  let itemDetail = arrayItems.map((item, index) => (
    <tr key={index}>
      <td>{item.dishId.name}</td>
      <td>{item.dishId.category}</td>
      <td>{item.dishId.price}</td>
      <td>{item.quantity}</td>
    </tr>
  ));
  return itemDetail;
};

const ShowOrderedListModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Fragment>
      <Link color="primary" onClick={toggle}>
        Show List
      </Link>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Dish</ModalHeader>
        <ModalBody>
          <TableWrapper>
            <Table borderless hover responsive size="sm">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Category</th>
                  <th>Rate</th>
                  <th>Quantity Ordered</th>
                </tr>
              </thead>
              <tbody>{props ? renderItems(props) : null}</tbody>
            </Table>
          </TableWrapper>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ShowOrderedListModal;
