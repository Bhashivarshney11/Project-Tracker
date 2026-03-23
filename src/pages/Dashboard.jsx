import { useState } from "react";

import KanbanBoard from "../components/Kanban/KanbanBoard";
import ListView from "../components/List/ListView";
import GanttView from "../components/Gantt/GanttView";
import FilterBar from "../components/Filters/FilterBar";

export default function Dashboard() {
  const [view, setView] = useState("kanban");

  return (
    <div className="p-4">
      {/* 🔥 View Switch Buttons */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setView("kanban")}
          className={`px-3 py-1 rounded text-white ${
            view === "kanban" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-3 py-1 rounded text-white ${
            view === "list" ? "bg-gray-600" : "bg-gray-400"
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView("gantt")}
          className={`px-3 py-1 rounded text-white ${
            view === "gantt" ? "bg-purple-600" : "bg-gray-400"
          }`}
        >
          Timeline
        </button>
      </div>

      {/* 🔥 FILTER BAR */}
      <FilterBar />

      {/* 🔥 VIEWS */}
      <div className="mt-4">
        {view === "kanban" && <KanbanBoard />}
        {view === "list" && <ListView />}
        {view === "gantt" && <GanttView />}
      </div>
    </div>
  );
}