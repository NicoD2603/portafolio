"use client";

import "../src/styles/TaskForm.scss";
import { useRef, useState, useEffect } from "react";

const TaskForm = ({ OpenCloseForm, taskToEdit = null, onTaskSaved }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [isActive, setIsActive] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    console.log("taskToEdit actualizado:", taskToEdit);
  }, [taskToEdit]);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
    setTimeout(() => setIsActive(true), 10);

    return () => setIsActive(false);
  }, [taskToEdit]);

  useEffect(() => {
    console.log("taskToEdit actualizado:", taskToEdit);
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status };

    try {
      const response = await fetch(
        taskToEdit ? `${API_URL}/task/${taskToEdit.id}/` : `${API_URL}/task/`,
        {
          method: taskToEdit ? "PUT" : "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      if (onTaskSaved) {
        onTaskSaved();
      }
      OpenCloseForm();
    } catch (error) {
      console.error("error al guardar la tarea: ", error);
    }
  };

  return (
    <div
      className={`task-form-container ${taskToEdit ? "active" : ""}`}
      onClick={OpenCloseForm}
    >
      <div className="task-form" onClick={(e) => e.stopPropagation()}>
        <h3>{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
        <form className="fields-add-form" onSubmit={handleSubmit}>
          <div className="title-new-task">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter your task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="description-new-task">
            <label>Description</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="status-new-task">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="btns-new-task">
            <div className="cancel-btn" type="button" onClick={OpenCloseForm}>
              Close
            </div>
            <div
              className="confirm-btn"
              onClick={(e) => e.currentTarget.closest("form").requestSubmit()}
            >
              {taskToEdit ? "Update" : "Confirm"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
