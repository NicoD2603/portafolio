import { useState } from "react";
import "@/styles/taskItem.scss";
import TaskForm from "./TaskForm";

const TaskItem = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const deleteTask = async (e, taskId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8000/task/${taskId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        onTaskDeleted(task.id);
      } else {
        console.error("Error al eliminar la tarea:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red al eliminar la tarea:", error);
    }
  };

  const closeForm = () => {
    setIsEditing(false);
  }


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
            <div className="edit-btn" onClick={handleEditClick}>
              Edit
            </div>
            <div className="delete-btn" onClick={(e) => deleteTask(e, task.id)}>
              Delete
            </div>
          </div>
          {isEditing && (
            <TaskForm
              OpenCloseForm={closeForm}
              taskToEdit={task}
              onTaskSaved={() => {
                onTaskUpdated={hand};
                closeForm();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
