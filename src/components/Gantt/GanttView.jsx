import { useTaskStore } from "../../store/useTaskStore";

const getDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export default function GanttView() {
  const tasks = useTaskStore((state) => state.tasks);

  const days = getDaysInMonth();
  const today = new Date().getDate();

  return (
    <div className="overflow-x-auto border h-[80vh]">
      <div className="min-w-[1200px]">
        {/* Header (Dates) */}
        <div className="flex sticky top-0 bg-white z-10 border-b">
          <div className="w-[200px] p-2 font-bold">Task</div>

          {Array.from({ length: days }).map((_, i) => (
            <div
              key={i}
              className="w-[40px] text-xs text-center border-l"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Body */}
        {tasks.map((task) => {
          const start = task.startDate
            ? new Date(task.startDate).getDate()
            : new Date(task.dueDate).getDate();

          const end = new Date(task.dueDate).getDate();

          const left = (start - 1) * 40;
          const width = (end - start + 1) * 40;

          return (
            <div key={task.id} className="flex items-center border-b h-[50px] relative">
              {/* Task Name */}
              <div className="w-[200px] p-2 text-sm truncate">
                {task.title}
              </div>

              {/* Timeline */}
              <div className="relative flex-1 h-full">
                {/* Task Bar */}
                <div
                  className={`absolute h-6 top-1/2 -translate-y-1/2 rounded
                  ${
                    task.priority === "critical"
                      ? "bg-red-500"
                      : task.priority === "high"
                      ? "bg-orange-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    left: `${left}px`,
                    width: `${width}px`,
                  }}
                ></div>

                {/* Today Line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-blue-600"
                  style={{
                    left: `${(today - 1) * 40}px`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}