import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser({ show, handleAddUserModalClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTaskAdded, setIsTaskAdded] = useState(false);

  const addUser = async () => {
    try {
      const requestBody = {
        username: username,
        password: password,
      };

      console.log(requestBody);

      const response = await axios.post(
        "https://693utogn2j.execute-api.eu-west-1.amazonaws.com/dev/add-user",
        requestBody
      );
      console.log("Task added successfully:", response.data);

      toast.success("User added successfully!", {
        className: "custom-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleAddUserModalClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add user. Please try again.", {
        className: "custom-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleAddUserModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddUserModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addUser}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser;
