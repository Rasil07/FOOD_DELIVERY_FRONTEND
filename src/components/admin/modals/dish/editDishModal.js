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
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { editDish } from "../../../../redux/actions/dishActions";

const EditDishModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  const [name, setName] = useState(`${props.item.name}`);
  const [category, setCategory] = useState(`${props.item.category}`);
  const [price, setPrice] = useState(`${props.item.price}`);
  const [image, setImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("category", category);
    data.append("price", price);
    data.append("image", image);

    dispatch(editDish(props.item._id, data));
    setCategory(`${props.item.category}`);
    setName(`${props.item.name}`);
    setPrice(`${props.item.price}`);
    setImage("");
    toggle();
  };

  return (
    <div>
      <ActionButton background="#febf63" onClick={toggle}>
        <FontAwesomeIcon icon={faEdit} />
      </ActionButton>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="dishName"
                defaultValue={props.item.name}
                placeholder="Enter dish name"
                onChange={(e) => {
                  const { value } = e.target;
                  setName(value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Category</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                defaultValue={props.item.category}
                onChange={(e) => {
                  const { value } = e.target;
                  setCategory(value);
                }}
              >
                <option>Veg</option>
                <option>Non Veg</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                name="dishPrice"
                defaultValue={props.item.price}
                placeholder="Enter dish price"
                onChange={(e) => {
                  const { value } = e.target;
                  setPrice(value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <img
                src={props.item.image}
                style={{ width: "100px", height: "100px" }}
              />
              <Label>Photo</Label>
              <Input
                type="file"
                name="image"
                onChange={(e) => {
                  const image = e.target.files[0];
                  setImage(image);
                }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>
            Edit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditDishModal;
