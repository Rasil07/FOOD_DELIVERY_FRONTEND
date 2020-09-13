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
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionButton } from "../../../../styles/CartStyles";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../../redux/actions/orderActions";

const DeleteOrderModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteOrder(props.id));
    toggle();
  };

  return (
    <Fragment>
      <ActionButton background="#e8505b" onClick={toggle}>
        <FontAwesomeIcon icon={faTimes} />
      </ActionButton>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Order ?</ModalHeader>
        <ModalBody>
          <p>Do you want to delete this order ?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default DeleteOrderModal;
