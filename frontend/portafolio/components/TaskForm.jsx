"use client";

import "@/styles/TaskForm.scss";
import { useState, useEffect } from "react";

const TaskForm = ({ OpenCloseForm, isOpen, onTaskSaved, task = null }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const Submit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status };

    try {
      const response = await fetch(
        `${API_URL}/task/${task ? task.id + "/" : ""}`,
        {
          method: task ? "PATCH" : "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTask = await response.json();

      if (onTaskSaved) onTaskSaved(updatedTask);
      OpenCloseForm();
    } catch (error) {
      console.error("error al guardar la tarea: ", error);
    }
  };

  return (
    <div
      className={`task-form-container ${isOpen ? "active" : ""}`}
      onClick={OpenCloseForm}
    >
      <div className="task-form" onClick={(e) => e.stopPropagation()}>
        <h3>{task ? "Edit Task" : "Add New Task"}</h3>
        <form className="fields-add-form" onSubmit={Submit}>
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
              type="submit"
              onClick={(e) => e.currentTarget.closest("form").requestSubmit()}
            >
              {task ? "Update" : "Confirm"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
