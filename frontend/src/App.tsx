import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask, Task } from "./api";

type Filter = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);
  const LOCAL_KEY = "plc_tasks_v1";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const server = await getTasks();
        setTasks(server);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(server));
      } catch {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) setTasks(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const onAdd = async () => {
    if (!text.trim()) return;
    const desc = text.trim();
    setText("");
    try {
      const t = await addTask(desc);
      setTasks((prev) => [t, ...prev]);
    } catch {
      const tmp: Task = {
        id: `tmp-${Date.now()}`,
        description: desc,
        isCompleted: false,
      };
      setTasks((prev) => [tmp, ...prev]);
    }
  };

  const onToggle = async (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
    const t = tasks.find((x) => x.id === id);
    try {
      await updateTask(id, { isCompleted: t ? !t.isCompleted : true });
    } catch {}
  };

  const onDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch {}
  };

  const filtered = tasks.filter((t) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !t.isCompleted
      : t.isCompleted
  );

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="display-6 fw-bold text-primary mb-2">
                    <i className="bi bi-check2-square me-2"></i>
                    Task Manager
                  </h1>
                  <p className="text-muted">Stay organized and productive</p>
                </div>

                {/* Add Task Form */}
                <div className="row g-2 mb-4">
                  <div className="col">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-lg border-2"
                        placeholder="What needs to be done?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onAdd()}
                      />
                      <button
                        className="btn btn-primary btn-lg px-4"
                        type="button"
                        onClick={onAdd}
                        disabled={!text.trim()}
                      >
                        <i className="bi bi-plus-lg me-1"></i>
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
                  <button
                    className={`btn btn-outline-primary ${
                      filter === "all" ? "active" : ""
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    <i className="bi bi-list-ul me-1"></i>
                    All
                  </button>
                  <button
                    className={`btn btn-outline-warning ${
                      filter === "active" ? "active" : ""
                    }`}
                    onClick={() => setFilter("active")}
                  >
                    <i className="bi bi-clock me-1"></i>
                    Active
                  </button>
                  <button
                    className={`btn btn-outline-success ${
                      filter === "completed" ? "active" : ""
                    }`}
                    onClick={() => setFilter("completed")}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Completed
                  </button>
                </div>

                {/* Task Counter */}
                <div className="text-center mb-3">
                  <small className="text-muted">
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    ) : (
                      <i className="bi bi-list-task me-1"></i>
                    )}
                    {loading ? "Loading..." : `${tasks.length} tasks`}
                  </small>
                </div>

                {/* Task List */}
                <div className="list-group list-group-flush">
                  {filtered.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-inbox display-1 text-muted"></i>
                      <p className="text-muted mt-3">
                        {filter === "all"
                          ? "No tasks yet. Add one above!"
                          : filter === "active"
                          ? "No active tasks"
                          : "No completed tasks"}
                      </p>
                    </div>
                  ) : (
                    filtered.map((t) => (
                      <div
                        key={t.id}
                        className="list-group-item list-group-item-action border-0 py-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={t.isCompleted}
                              onChange={() => onToggle(t.id)}
                              style={{ transform: "scale(1.2)" }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <span
                              className={`${
                                t.isCompleted
                                  ? "text-decoration-line-through text-muted"
                                  : "fw-medium"
                              }`}
                            >
                              {t.description}
                            </span>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(t.id)}
                            title="Delete task"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
