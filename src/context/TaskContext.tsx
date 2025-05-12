import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Task } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Filter = "all" | "completed" | "pending";

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = useCallback(
    (task: Omit<Task, "id">) => {
      setTasks((prev: Task[]) => [
        { id: Date.now().toString(), ...task },
        ...prev,
      ]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev: Task[]) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        filter,
        setFilter,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
