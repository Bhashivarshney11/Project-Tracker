import { create } from "zustand";

const users = ["A", "B", "C", "D", "E", "F"];
const statuses = ["todo", "in-progress", "review", "done"];
const priorities = ["low", "medium", "high", "critical"];

const generateTasks = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `task-${i}`,
    title: `Task ${i}`,
    status: statuses[Math.floor(Math.random() * 4)],
    priority: priorities[Math.floor(Math.random() * 4)],
    assignee: users[Math.floor(Math.random() * 6)],
    dueDate: new Date().toISOString(),
  }));
};

export const useTaskStore = create((set) => ({
  tasks: generateTasks(20),

  draggingTaskId: null,

  setDraggingTask: (id) => set({ draggingTaskId: id }),

  clearDraggingTask: () => set({ draggingTaskId: null }),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
}));