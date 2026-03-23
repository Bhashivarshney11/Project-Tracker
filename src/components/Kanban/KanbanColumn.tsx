import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ title, status }) {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const draggingTaskId = useTaskStore((state) => state.draggingTaskId);

  // Filter tasks for this column
  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div
      className={`w-1/4 p-3 rounded h-[80vh] flex flex-col transition
      ${draggingTaskId ? "bg-blue-50" : "bg-gray-100"}`}
    >
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h2 className="font-bold">{title}</h2>
        <span className="text-sm text-gray-500">
          {filteredTasks.length}
        </span>
      </div>

      {/* Drop Area */}
      <div
        className="overflow-y-auto flex-1"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const taskId = e.dataTransfer.getData("taskId");

          if (taskId) {
            updateTask(taskId, { status });
          }
        }}
      >
        {/* Empty State */}
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            📭 No tasks in this column
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} view="kanban" />
          ))
        )}
      </div>
    </div>
  );
}