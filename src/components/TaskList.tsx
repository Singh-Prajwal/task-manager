import React, { useMemo, useCallback } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const TaskList: React.FC = React.memo(() => {
  const { tasks, filter, setTasks } = useTasks();

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      setTasks((prev: any[]) =>
        reorder(prev, result.source.index, result.destination!.index)
      );
    },
    [setTasks]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskList">
        {(droppableProvided) => (
          <div
            className="task-list"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {filteredTasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id} index={idx}>
                {(draggableProvided) => (
                  <TaskItem
                    innerRef={draggableProvided.innerRef}
                    task={task}
                    draggableProps={draggableProvided.draggableProps}
                    dragHandleProps={draggableProvided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default TaskList;
