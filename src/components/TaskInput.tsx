import React, { useState, FormEvent, useCallback } from "react";
import { useTasks } from "../context/TaskContext";

const TaskInput = React.memo(() => {
  const [text, setText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (text.trim() === "") return;
      addTask({ text: text.trim(), completed: false });
      setText("");
    },
    [text, addTask]
  );

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button type="submit" disabled={text.trim() === ""}>
        Add
      </button>
    </form>
  );
});

export default TaskInput;
