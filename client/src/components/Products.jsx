// import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";

// Build componnent
const Products = () => {
  // initalize local states
  const [products, setProducts] = useState(useSelector((state) => state.shoes));
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalVariants, setModalVariants] = useState(false);
  const [available, setAvailable] = useState(false);

  const initial = {
    id: "",
    masterName: "",
    gender: "",
    categories: [],
    size: {},
    colors: [],
    stock: {},
    price: 0,
    imagecover: "",
    imageurl: [],
  };
  const [form, setForm] = useState(initial);

  // get 'redux store' of shoes / products
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [products, categories, available]);

  // ----------------------------------------------------

  const showModalUpdate = (data) => {
    setForm(data);
    setModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setModalUpdate(false);
  };

  const showModalInsert = () => {
    setModalInsert(true);
  };

  const closeModalInsert = () => {
    setModalInsert(false);
    setForm(initial);
  };

  const showModalVariants = (data) => {
    setModalVariants(true);
  };

  const closeModalVariants = () => {
    setModalVariants(false);
  };

  const update = (data) => {
    let i = 0;
    let arrPoducts = products;
    arrPoducts.map((e) => {
      if (data.id === e.id) {
        arrPoducts[i].masterName = data.masterName;
        arrPoducts[i].gender = data.gender;
        arrPoducts[i].categories = data.categories;
        arrPoducts[i].price = data.price;
        arrPoducts[i].imagecover = data.imagecover;
        arrPoducts[i].imageurl = data.imageurl;
      }
      i++;
    });
    setProducts(arrPoducts);
    setModalUpdate(false);
  };

  const changeStatus = (data) => {
    let option = window.confirm(
      "Are you sure you want to change the status? " + data.masterName
    );
    if (option) {
      let i = 0;
      let arrPoducts = products;
      arrPoducts.map((e) => {
        if (data.id === e.id) {
          const newAvailable =
            arrPoducts[i].available === "Available"
              ? "Not Available"
              : "Available";
          arrPoducts[i].available = newAvailable;
        }
        i++;
      });
      setProducts(arrPoducts);
      setAvailable((prevStatus) => ({ ...prevStatus, available: !!available }));
    }
  };

  const insert = () => {
    let newForm = { ...form };
    console.log(newForm);
    newForm.id = products.length + 1;
    let list = products;
    list.push(newForm);
    setModalInsert(false);
    setProducts(list);
  };

  const handleChange = (e) => {
    if (e.target.name === "imageurl") {
      setForm({ ...form, [e.target.name]: [e.target.value] });
    } else if (e.target.name !== "categories") {
      setForm({ ...form, [e.target.name]: e.target.value });
      console.log(form);
      console.log(e.target.value, e.target.name);
    }
  };

  const handleClick = (e) => {
    if (e.target.name === "categories") {
      let newData = { name: e.target.value };
      setForm({
        ...form,
        categories: [...form.categories, newData],
      });
    }
  };

  // ----------------------------------------------------

  //render
  return (
    <>
      <div>
        <h3>Product Management</h3>
      </div>
      <Container>
        <br />
        <Button color="success" onClick={() => showModalInsert()}>
          Add Product
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>BestFor</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.id}</td>
                  <td>
                    <img
                      src={e.imagecover}
                      alt="img not found!"
                      width="50"
                      height="50"
                    ></img>
                  </td>
                  <td>{e.masterName}</td>
                  <td>{e.gender}</td>
                  <td>{e.categories.map((el) => el?.name?.concat(", "))}</td>
                  <td>{new Intl.NumberFormat("en-EN").format(e.price)}</td>
                  <td>{e.available}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => showModalVariants(e)}
                    >
                      Variants
                    </Button>{" "}
                    {"  "}
                    <Button color="primary" onClick={() => showModalUpdate(e)}>
                      Edit
                    </Button>{" "}
                    {"  "}
                    <Button color="danger" onClick={() => changeStatus(e)}>
                      {e.available === "Available"
                        ? "Check Not Available"
                        : "Check Available"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      {/* ----------- insert data -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Add Product</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={products.length + 1}
            />
          </FormGroup>

          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              name="masterName"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>BestFor:</label>
            {categories?.map((e, index) => {
              return (
                <div key={index} className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="categories"
                      value={e.name}
                      onClick={(e) => handleClick(e)}
                    />
                    {` ${e.name}`}
                  </label>
                </div>
              );
            })}
          </FormGroup>

          <FormGroup>
            <label>Gender:</label>
            <select
              className="form-control"
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option>mens</option>
              <option>womens</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="numeric"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => insert()}>
            Add
          </Button>
          <Button className="btn btn-danger" onClick={() => closeModalInsert()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* -------------------------------------------- */}

      {/* ----------- create variants -------------------- */}
      {/* -------------------------------------------- */}

      <Modal isOpen={modalVariants}>
        <ModalHeader>
          <div>
            <h3>Add and edit variants</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <h3>Sorry we are under construction!</h3>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => closeModalVariants()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* ----------- update data -------------------- */}
      {/* -------------------------------------------- */}
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Update Product</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Name:</label>
            <input
              className="form-control"
              name="masterName"
              type="text"
              onChange={(e) => handleChange(e)}
              value={form.masterName}
            />
          </FormGroup>

          <FormGroup>
            <label>Gender:</label>
            <select
              className="form-control"
              name="gender"
              value={form.gender}
              onChange={(e) => handleChange(e)}
            >
              <option selected={form.gender === "mens" ? true : false}>
                mens
              </option>
              <option selected={form.gender === "womens" ? true : false}>
                womens
              </option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Price:</label>
            <input
              className="form-control"
              name="price"
              type="numeric"
              value={form.price}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Image Cover:</label>
            <input
              className="form-control"
              name="imagecover"
              type="text"
              value={form.imagecover}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <label>Other Images:</label>
            <input
              className="form-control"
              name="imageurl"
              type="text"
              value={form.imageurl}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => update(form)}>
            Update
          </Button>
          <Button color="danger" onClick={() => closeModalUpdate()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Products;
