import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {
  return (
    <div className="flex gap-4">
      <KanbanColumn title="To Do" status="todo" />
      <KanbanColumn title="In Progress" status="in-progress" />
      <KanbanColumn title="In Review" status="review" />
      <KanbanColumn title="Done" status="done" />
    </div>
  );
}