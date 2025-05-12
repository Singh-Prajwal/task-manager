import React from "react";
import { useTasks } from "../context/TaskContext";

const FilterBar: React.FC = React.memo(() => {
  const { filter, setFilter } = useTasks();

  return (
    <div className="filter-bar">
      <button aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
        All
      </button>
      <button
        aria-pressed={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        aria-pressed={filter === "pending"}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
});

export default FilterBar;
