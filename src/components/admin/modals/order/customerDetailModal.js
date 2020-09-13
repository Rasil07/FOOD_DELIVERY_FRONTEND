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
import { Link } from "react-router-dom";

const CustomerDetailModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Fragment>
      <Link color="primary" onClick={toggle}>
        {props.customer.name}
      </Link>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Customer Detail</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name : {props.customer.name}</label>
          </div>
          <div className="form-group">
            <label>Contact_No : {props.customer.contact_no}</label>
          </div>
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

export default CustomerDetailModal;
