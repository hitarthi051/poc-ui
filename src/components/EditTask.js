import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

function EditTask({
  show,
  handleEditModalClose,
  handleClose,
  username,
  taskDetails,
}) {
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState({
    name: "",
    priority: "medium",
    istaskcompleted: false,
    task_deadline: "",
  });

  useEffect(() => {
    if (taskDetails) {
      setUpdatedTaskDetails({
        name: taskDetails.task_name || "",
        priority: taskDetails.task_priority || "medium",
        istaskcompleted: taskDetails.istaskcompleted,
        task_deadline: taskDetails.task_deadline,
      });
    }
  }, [taskDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Field Updated: ${name}, Value: ${value}`);
    setUpdatedTaskDetails((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" || type === "radio" ? value === "true" : value,
    }));
  };

  const updateTaskDetails = async () => {
    console.log("Updated Task Details:", updatedTaskDetails);
    try {
      const requestBody = {
        task_name: updatedTaskDetails.name,
        task_priority: updatedTaskDetails.priority,
        istaskcompleted: updatedTaskDetails.istaskcompleted,
        task_deadline: updatedTaskDetails.task_deadline,
      };

      console.log("task_deadline in request body:: " + requestBody.task_deadline);

      const response = await axios.put(
        `693utogn2j.execute-api.eu-west-1.amazonaws.com/dev/update-task/${taskDetails.id}`,
        requestBody
      );
      console.log("Updated task:", response.data);

      toast.success("Task updated successfully!", {
        className: "custom-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleEditModalClose();
      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.", {
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
    <Modal show={show} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name" // Added name attribute
              value={updatedTaskDetails.name}
              placeholder="Edit task name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority" // Added name attribute
              value={updatedTaskDetails.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Status</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="completed"
                name="istaskcompleted"
                label="Completed"
                value="true" // Correctly set value as boolean true
                checked={updatedTaskDetails.istaskcompleted === true}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                id="notCompleted"
                name="istaskcompleted"
                label="Not Completed"
                value="false" // Correctly set value as boolean false
                checked={updatedTaskDetails.istaskcompleted === false}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="date"
              name="task_deadline"
              value={updatedTaskDetails.task_deadline}
              placeholder="Edit Task Deadline"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateTaskDetails}>
          Update Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTask;
