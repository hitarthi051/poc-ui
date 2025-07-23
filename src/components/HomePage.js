// App.js File
import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import AddUser from "./AddUser";

const HomePage = () => {
  const navigate = useNavigate();
  const [addUserModalShow, setAddUserModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState(null);

  const getAllTasks = async () => {
    console.log(username);
    console.log("693utogn2j.execute-api.eu-west-1.amazonaws.com/dev/get-tasks-by-username");
    await axios
      .post("693utogn2j.execute-api.eu-west-1.amazonaws.com/dev/get-tasks-by-username", { username })
      .then((res) => {
        console.log(res.data);
        navigate("/my-tasks", {
          state: { task: res.data.task, username: username },
        });
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  };

  const handleAddUserModal = () => setAddUserModalShow(true);

  const handleAddUserModalClose = async () => {
    console.log("handleAddUserModalClose called");
    setAddUserModalShow(false);
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter Username"
              size="lg"
              aria-label="add something"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <InputGroup>
              <Button
                variant="dark"
                className="mt-3 mx-auto"
                onClick={getAllTasks}
              >
                Get Tasks
              </Button>
            </InputGroup>
          </InputGroup>
          <span>
            If you are a new user,{" "}
            <Button style={{padding: "0px", textDecoration: "none"}} variant="link" onClick={handleAddUserModal}>
              click here
            </Button>{" "}
          </span>
        </Col>
      </Row>

      <AddUser
        show={addUserModalShow}
        handleAddUserModalClose={handleAddUserModalClose}
      />
    </Container>
  );
};

export default HomePage;
