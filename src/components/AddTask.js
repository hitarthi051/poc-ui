import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

function AddTask({ show, handleClose, username }) {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("high");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [isTaskAdded, setIsTaskAdded] = useState(false);

  const addTask = async () => {
    console.log("taskDeadline:: " + taskDeadline);
    try {
      const requestBody = {
        username,
        task_name: taskName,
        task_priority: taskPriority,
        task_deadline: taskDeadline
      };

      console.log(requestBody);

      const response = await axios.post(
        "testapi.infra.icpo.altosaint.co.uk/add-task",
        requestBody
      );
      console.log("Task added successfully:", response.data);

      setTaskName("");
      setTaskPriority("medium");
      setIsTaskAdded(true);

      toast.success("Task added successfully!", {
        className: "custom-toast",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.", {
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter task name"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="taskPriority" className="form-label">
              Task Priority
            </label>
            <select
              id="taskPriority"
              name="taskPriority"
              className="form-select"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="taskDeadline" className="form-label">
              Task Deadline
            </label>
            <input
              type="date"
              id="taskDeadline"
              name="taskDeadline"
              className="form-control"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addTask}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTask;
