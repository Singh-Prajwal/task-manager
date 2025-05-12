import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

const App: React.FC = () => (
  <ThemeProvider>
    <TaskProvider>
      <div className="app-container">
        <header>
          <h1>Task Manager</h1>
          <ThemeToggle />
        </header>
        <TaskInput />
        <FilterBar />
        <TaskList />
      </div>
    </TaskProvider>
  </ThemeProvider>
);

export default App;
