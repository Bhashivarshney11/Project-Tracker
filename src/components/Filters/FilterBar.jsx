import { useSearchParams } from "react-router-dom";

const statuses = ["todo", "in-progress", "review", "done"];
const priorities = ["low", "medium", "high", "critical"];
const assignees = ["A", "B", "C", "D", "E", "F"];

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValues = (key) => searchParams.getAll(key);

  const toggleFilter = (key, value) => {
    const values = getValues(key);

    let newValues;
    if (values.includes(value)) {
      newValues = values.filter((v) => v !== value);
    } else {
      newValues = [...values, value];
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    newValues.forEach((v) => newParams.append(key, v));

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="mb-4 p-3 border rounded bg-gray-50 flex flex-wrap gap-4">
      {/* Status */}
      <div>
        <p className="font-semibold text-sm">Status</p>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => toggleFilter("status", s)}
            className={`px-2 py-1 m-1 rounded border text-xs ${
              getValues("status").includes(s)
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Priority */}
      <div>
        <p className="font-semibold text-sm">Priority</p>
        {priorities.map((p) => (
          <button
            key={p}
            onClick={() => toggleFilter("priority", p)}
            className={`px-2 py-1 m-1 rounded border text-xs ${
              getValues("priority").includes(p)
                ? "bg-purple-500 text-white"
                : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Assignee */}
      <div>
        <p className="font-semibold text-sm">Assignee</p>
        {assignees.map((a) => (
          <button
            key={a}
            onClick={() => toggleFilter("assignee", a)}
            className={`px-2 py-1 m-1 rounded border text-xs ${
              getValues("assignee").includes(a)
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Clear Button */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="ml-auto px-3 py-1 bg-red-500 text-white rounded"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}