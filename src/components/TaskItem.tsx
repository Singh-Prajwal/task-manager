import React from "react";
import { Task } from "../types";
import { useTasks } from "../context/TaskContext";

interface TaskItemProps {
  task: Task;
  dragHandleProps?: any;
  draggableProps?: any;
  innerRef?: (element: HTMLElement | null) => any;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, dragHandleProps, draggableProps, innerRef }) => {
    const { toggleTask, deleteTask } = useTasks();

    return (
      <div
        className={`task-item${task.completed ? " completed" : ""}`}
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Mark ${task.text} completed`}
        />
        <span>{task.text}</span>
        <button
          onClick={() => deleteTask(task.id)}
          aria-label={`Delete ${task.text}`}
        >
          ×
        </button>
      </div>
    );
  }
);

export default TaskItem;
