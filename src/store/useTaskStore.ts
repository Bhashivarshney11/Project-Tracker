import { create } from "zustand";

const users = ["A", "B", "C", "D", "E", "F"];
const statuses = ["todo", "in-progress", "review", "done"];
const priorities = ["low", "medium", "high", "critical"];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (offsetDays = 30) => {
  const today = new Date();
  const randomOffset = randomInt(-offsetDays, offsetDays);
  const date = new Date(today);
  date.setDate(today.getDate() + randomOffset);
  return date.toISOString();
};

export type Task = {
  id: string;
  title: string;
  status: string;
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  dueDate: string;
};

const generateTasks = (count = 500): Task[] => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: `task-${i}`,
      title: `Task ${i} - ${["Feature", "Bug", "Design", "Refactor"][randomInt(0, 3)]}`,
      status: statuses[randomInt(0, statuses.length - 1)],
      priority: priorities[randomInt(0, priorities.length - 1)] as Task["priority"],
      assignee: users[randomInt(0, users.length - 1)],
      dueDate: randomDate(30), 
    };
  });
};

export const useTaskStore = create<{
  tasks: Task[];
  draggingTaskId: string | null;
  setDraggingTask: (id: string) => void;
  clearDraggingTask: () => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}>((set, get) => ({
  tasks: generateTasks(500),

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