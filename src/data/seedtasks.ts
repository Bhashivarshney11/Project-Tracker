import { Task } from "../store/useTaskStore"; 

const assignees = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
const priorities: Task["priority"][] = ["low", "medium", "high", "critical"];
const statuses = ["todo", "in-progress", "review", "done"];
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (offsetDays = 15) => {
  const today = new Date();
  const randomOffset = randomInt(-offsetDays, offsetDays);
  const date = new Date(today);
  date.setDate(today.getDate() + randomOffset);
  return date.toISOString();
};
export const generateTasks = (count: number = 500): Task[] => {
  const tasks: Task[] = [];

  for (let i = 1; i <= count; i++) {
    const hasStartDate = Math.random() > 0.2; 
    const startDate = hasStartDate ? randomDate(15) : null;
    const dueDate = randomDate(30); 

    tasks.push({
      id: `task-${i}`,
      title: `Task ${i} - ${["Feature", "Bug", "Refactor", "Design"][randomInt(0, 3)]}`,
      status: statuses[randomInt(0, statuses.length - 1)],
      priority: priorities[randomInt(0, priorities.length - 1)],
      assignee: assignees[randomInt(0, assignees.length - 1)],
      dueDate,
    });
  }

  return tasks;
};