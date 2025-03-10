import { useState } from "react";
import "@/styles/taskItem.scss";
import TaskForm from "./TaskForm";

const TaskItem = ({ task, onDeleteTask, onUpdateTask, onOpenCloseForm }) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const closeForm = () => setIsEditing(false);

  return (
    <div
      className={`task-item-container ${isActive ? "active" : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <h3 className="task-title">
        {task.id}. {task.title}
      </h3>
      {isActive && (
        <div className="task-details">
          <p>{task.description}</p>
          <div className="task-description-btns">
            <div
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              Edit
            </div>
            <div
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
            >
              Delete
            </div>
          </div>
          {isEditing && (
            <TaskForm
              isOpen={isEditing}
              OpenCloseForm={() => setIsEditing(false)}
              onTaskSaved={(updatedTask) => {
                onUpdateTask(updatedTask);
                setIsEditing(false);
              }}
              task={task}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
