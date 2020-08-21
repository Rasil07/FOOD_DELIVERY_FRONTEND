import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { ActionButton } from "../../../../styles/CartStyles";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { deleteDish } from "../../../../redux/actions/dishActions";

const DeleteDishModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  return (
    <div>
      <ActionButton background="#e8505b" onClick={toggle}>
        <FontAwesomeIcon icon={faTimes} />
      </ActionButton>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Dish</ModalHeader>
        <ModalBody>
          <Label>
            Do you want to delete: <strong>{props.item.name}</strong>{" "}
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => (dispatch(deleteDish(props.item._id)), toggle)}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteDishModal;
