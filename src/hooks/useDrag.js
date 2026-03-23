import { useState } from "react";

export const useDrag = () => {
  const [draggingTask, setDraggingTask] = useState(null);

  const startDrag = (task) => {
    setDraggingTask(task);
  };

  const endDrag = () => {
    setDraggingTask(null);
  };

  return {
    draggingTask,
    startDrag,
    endDrag,
  };
};