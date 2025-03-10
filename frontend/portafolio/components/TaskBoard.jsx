"use client";

import "@/styles/board.scss";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  const columns = [
    { id: "pending", title: "Pendings" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completeds" },
  ];

  const taskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const taskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  useEffect(() => {
    fetch(`${API_URL}/task/`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, []);

  return (
    <div className="board">
      <div className="title">
        <h1>Lista de Tareas</h1>
      </div>
      <div className="columns">
        {columns.map((column) => (
          <div key={column.id} className={`task-column ${column.id}`}>
            <div className="title-task-column">
              <h2>{column.title}</h2>
            </div>
            <TaskList
              tasks={tasks}
              status={column.id}
              onTaskDeleted={taskDeleted}
              onTaskUpdated={taskUpdated}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
