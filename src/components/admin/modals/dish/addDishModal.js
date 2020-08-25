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

import { useDispatch } from "react-redux";
import { addDish } from "../../../../redux/actions/dishActions";

const AddDishModal = (props) => {
  const { buttonLabel, className } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [category, setCategory] = useState("Veg");
  const [price, setPrice] = useState();
  const [image, setImage] = useState();

  const toggle = () => setModal(!modal);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("category", category);
    data.append("price", price);
    data.append("image", image);
    dispatch(addDish(data));
    toggle();
  };
  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add Dish
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Dish</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="dishName"
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
                placeholder="Enter dish price"
                onChange={(e) => {
                  const { value } = e.target;
                  setPrice(value);
                }}
              />
            </FormGroup>
            <FormGroup>
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
          <Button color="primary" onClick={handleSubmit}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddDishModal;
