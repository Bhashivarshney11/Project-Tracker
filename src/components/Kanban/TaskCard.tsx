import { useTaskStore } from "../../store/useTaskStore";
type Task = {
  id: string;
  title: string;
  status: string;
  priority: "low" | "medium" | "high" | "critical";
  assignee: string;
  dueDate: string;
};
type Props = {
  task: Task;
  view?: "kanban" | "list" | "gantt";
};

export default function TaskCard({ task, view = "kanban" }: Props) {
  const setDraggingTask = useTaskStore((s) => s.setDraggingTask);
  const clearDraggingTask = useTaskStore((s) => s.clearDraggingTask);
  const draggingTaskId = useTaskStore((s) => s.draggingTaskId);

  const isDragging = draggingTaskId === task.id;
  const formatDueDate = (date: string): string => {
    const today = new Date();
    const due = new Date(date);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Due Today";

    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      return `${overdueDays} day${overdueDays > 1 ? "s" : ""} overdue`;
    }

    return due.toLocaleDateString();
  };

  const isOverdue = new Date(task.dueDate) < new Date();
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2); 
  };

  const priorityColors: Record<Task["priority"], string> = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-green-500 text-white",
  };

  return (
    <div
      className={`p-3 rounded-xl mb-3 border cursor-grab transition-all
        ${isDragging ? "bg-gray-200 opacity-40 scale-95" : "bg-white hover:shadow-lg"}`}
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("taskId", task.id);
        setDraggingTask(task.id);
      }}
      onDragEnd={() => clearDraggingTask()}
    >
      {/* Title */}
      <h3 className="font-semibold text-sm text-gray-800">{task.title}</h3>

      {/* 🔹 Kanban View */}
      {view === "kanban" && (
        <div className="flex justify-between items-center mt-3">
          {/* Assignee Avatar */}
          <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
            {getInitials(task.assignee)}
          </div>

          {/* Priority Badge */}
          <span
            className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>

          <span className={`text-xs ${isOverdue ? "text-red-500 font-medium" : "text-gray-500"}`}>
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      )}

     
      {view !== "kanban" && (
        <>
          <div className="flex justify-between items-center mt-3">
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
              {getInitials(task.assignee)}
            </div>

            {/* Priority Badge */}
            <span className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          {/* Due Date */}
          <p className={`text-xs mt-3 ${isOverdue ? "text-red-500 font-medium" : "text-gray-500"}`}>
            {formatDueDate(task.dueDate)}
          </p>
        </>
      )}
    </div>
  );
}