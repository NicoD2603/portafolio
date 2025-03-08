"use client";

import "@/styles/taskList.scss";
import TaskItem from "./TaskItem";
import { useState } from "react";
import TaskForm from "./TaskForm";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TaskList = ({ tasks, status, onTaskDeleted }) => {
  const [formAddOpen, setFormAddOpen] = useState(false);

  const OpenCloseForm = () => {
    setFormAddOpen(!formAddOpen);
  };
  return (
    <div className="task-list">
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskItem key={task.id} task={task} onTaskDeleted={onTaskDeleted}/>
        ))}
      {status === "pending" && (
        <div className="add-task-btn" onClick={OpenCloseForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="-5.0 -10.0 110.0 135.0"
          >
            <path d="m50.008 0.0039062c-27.574 0-50.008 22.434-50.008 50.008s22.434 49.984 50.008 49.984c27.574 0 49.992-22.41 49.992-49.984s-22.414-50.008-49.992-50.008zm0 6.25c24.199 0 43.734 19.562 43.734 43.758 0 24.199-19.539 43.734-43.734 43.734-24.199 0-43.754-19.539-43.754-43.734 0-24.199 19.555-43.758 43.754-43.758zm0 18.5v-0.003906c-0.82812-0.003906-1.625 0.32422-2.2148 0.91016-0.58594 0.58594-0.91797 1.3789-0.92188 2.2109v19.004h-19.004c-0.83203-0.003906-1.6328 0.32812-2.2227 0.91406-0.58984 0.58984-0.91797 1.3906-0.91406 2.2227 0.003906 0.82812 0.33594 1.6211 0.92188 2.207 0.58984 0.58203 1.3867 0.91016 2.2148 0.90625h19.004v19.012c-0.003906 0.83203 0.32812 1.6328 0.91797 2.2227 0.58594 0.58594 1.3867 0.91797 2.2188 0.91406 0.83203 0 1.625-0.33203 2.2109-0.92188 0.58594-0.58984 0.91406-1.3867 0.91016-2.2148v-19.012h19.004c0.82813 0.003906 1.625-0.32422 2.2148-0.90625 0.58594-0.58594 0.91797-1.3789 0.92188-2.207 0.003907-0.83203-0.32422-1.6328-0.91406-2.2227-0.58984-0.58594-1.3906-0.91797-2.2227-0.91406h-19.004v-19.004c-0.003906-1.7227-1.3984-3.1172-3.1211-3.1211z" />
          </svg>
        </div>
      )}
      {formAddOpen && <TaskForm OpenCloseForm={OpenCloseForm} />}
    </div>
  );
};

export default TaskList;
