import { useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { useSearchParams } from "react-router-dom";

const ROW_HEIGHT = 60;
const BUFFER = 5;

export default function ListView() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [searchParams] = useSearchParams();

  // ✅ FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const status = searchParams.getAll("status");
    const priority = searchParams.getAll("priority");
    const assignee = searchParams.getAll("assignee");

    if (status.length && !status.includes(task.status)) return false;
    if (priority.length && !priority.includes(task.priority)) return false;
    if (assignee.length && !assignee.includes(task.assignee)) return false;

    return true;
  });

  const [scrollTop, setScrollTop] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [direction, setDirection] = useState("asc");

  // ✅ SORTING (FIXED)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortBy) return 0;

    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === "dueDate") {
      return direction === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    if (sortBy === "priority") {
      const order = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      };
      return direction === "asc"
        ? order[valA] - order[valB]
        : order[valB] - order[valA];
    }

    return direction === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  // ✅ VIRTUAL SCROLL
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const endIndex = startIndex + 12;

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);

  // ✅ SORT HANDLER
  const handleSort = (field) => {
    if (sortBy === field) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  return (
    <div
      className="h-[80vh] overflow-y-auto border"
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      {/* Header */}
      <div className="flex bg-gray-200 p-2 font-bold sticky top-0">
        <div
          className="w-1/3 cursor-pointer"
          onClick={() => handleSort("title")}
        >
          Title {sortBy === "title" && (direction === "asc" ? "↑" : "↓")}
        </div>

        <div
          className="w-1/3 cursor-pointer"
          onClick={() => handleSort("priority")}
        >
          Priority {sortBy === "priority" && (direction === "asc" ? "↑" : "↓")}
        </div>

        <div
          className="w-1/3 cursor-pointer"
          onClick={() => handleSort("dueDate")}
        >
          Due Date {sortBy === "dueDate" && (direction === "asc" ? "↑" : "↓")}
        </div>
      </div>

      {/* Empty State */}
      {sortedTasks.length === 0 ? (
        <div className="text-center mt-20 text-gray-400">
          No tasks found
        </div>
      ) : (
        <div style={{ height: sortedTasks.length * ROW_HEIGHT }}>
          <div
            style={{
              transform: `translateY(${startIndex * ROW_HEIGHT}px)`,
            }}
          >
            {visibleTasks.map((task) => (
              <div
                key={task.id}
                className="h-[60px] border-b flex items-center px-4 justify-between"
              >
                <span className="w-1/3">{task.title}</span>

                <span className="w-1/3">{task.priority}</span>

                {/* Inline Status Change */}
                <select
                  className="w-1/3 border p-1 rounded"
                  value={task.status}
                  onChange={(e) =>
                    updateTask(task.id, { status: e.target.value })
                  }
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}