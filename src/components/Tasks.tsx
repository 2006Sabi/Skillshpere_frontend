
import { useEffect, useState, useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Link } from "react-router-dom";
import { Calendar, Plus, Grid, List, Check, Pencil, X } from "lucide-react";

// ... existing code ...

type ServerTask = {
  _id: string;
  id?: string;
  title: string;
  type?: string;
  dueDate?: string | null;
  priority?: "high" | "medium" | "low" | string;
  completed?: boolean;
  status?: "todo" | "in-progress" | "done" | string;
  createdAt?: string;
};

const envApiBase = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
const API_BASE = envApiBase.replace("localhost", "127.0.0.1");

const columnOrder: Array<"todo" | "in-progress" | "done"> = [
  "todo",
  "in-progress",
  "done",
];

const columnTitles: Record<string, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

const getBadgeColor = (priority?: string) =>
  priority === "high"
    ? "bg-red-500"
    : priority === "low"
      ? "bg-green-500"
      : "bg-yellow-400";

export default function TasksPage(): JSX.Element {
  const [tasks, setTasks] = useState<ServerTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "kanban">("list");

  // Edit State
  const [editingTask, setEditingTask] = useState<ServerTask | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdateTask = async () => {
    if (!editingTask || !editingTask.title.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_BASE}/api/tasks/${editingTask.id || editingTask._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: editingTask.title,
          priority: editingTask.priority
        }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(prev => prev.map(t => (t._id === updated._id ? { ...t, ...updated } : t)));
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    }
  };

  const openEditModal = (task: ServerTask) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Load tasks once
  useEffect(() => {
    let ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/api/tasks`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: ac.signal,
          cache: "no-store",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load tasks: ${res.status} ${text}`);
        }
        const data: ServerTask[] = await res.json();
        setTasks(
          (data || []).map((t) => ({
            ...t,
            id: t.id ?? t._id,
          }))
        );
      } catch (err: any) {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  // Derived columns for Kanban
  const columns = useMemo(() => {
    const cols: Record<string, ServerTask[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };
    const normalizeStatus = (t: ServerTask) => {
      if (t.status && ["todo", "in-progress", "done"].includes(t.status))
        return t.status;
      return t.completed ? "done" : "todo";
    };
    tasks.forEach((t) => {
      const key = normalizeStatus(t);
      (cols[key] ?? cols.todo).push(t);
    });
    // sort by dueDate then createdAt
    Object.keys(cols).forEach((k) =>
      cols[k].sort((a, b) => {
        const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        if (aDue !== bDue) return aDue - bDue;
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      })
    );
    return cols;
  }, [tasks]);

  // Persist status change to server
  const persistStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const body: any = { status: newStatus, completed: newStatus === "done" };
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update task: ${res.status} ${text}`);
      }
      const updated: ServerTask = await res.json().catch(() => null as any);
      // merge updated task into local tasks if returned
      if (updated) {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? { ...t, ...updated } : t))
        );
      }
      return true;
    } catch (err: any) {
      console.error("persistStatusChange", err);
      setError(err.message || "Failed to update task");
      return false;
    }
  };

  // Handle DnD
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    const srcCol = source.droppableId;
    const dstCol = destination.droppableId;
    if (srcCol === dstCol && source.index === destination.index) return;

    // find moved item id
    const moved = columns[srcCol][source.index];
    if (!moved) return;

    // optimistic local update: adjust tasks array's status/completed
    setTasks((prev) =>
      prev.map((t) =>
        t._id === moved._id
          ? {
            ...t,
            status: dstCol,
            completed: dstCol === "done" ? true : false,
          }
          : t
      )
    );

    const ok = await persistStatusChange(moved._id, dstCol);
    if (!ok) {
      // revert by re-fetching tasks (simple)
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/api/tasks`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data: ServerTask[] = await res.json();
          setTasks(data);
        }
      } catch (e) {
        console.error("reload after failed update", e);
      } finally {
        setLoading(false);
      }
    }
  };

  // List view helpers: create new task (simple)
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] =
    useState<ServerTask["priority"]>("medium");

  const createTask = async () => {
    if (!newTitle.trim()) {
      setError("Title required");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title: newTitle, priority: newPriority }),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      const created = await res.json();
      setTasks((p) => [created, ...p]);
      setCreating(false);
      setNewTitle("");
      setNewPriority("medium");
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="mt-3 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-gray-500">
            Personal tasks and Kanban board
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 rounded-md flex items-center gap-2 ${view === "list" ? "bg-indigo-600 text-white" : "bg-white border"
              }`}
            title="List view"
          >
            <List className="w-4 h-4" /> List
          </button>

          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-2 rounded-md flex items-center gap-2 ${view === "kanban" ? "bg-indigo-600 text-white" : "bg-white border"
              }`}
            title="Kanban view"
          >
            <Grid className="w-4 h-4" /> Kanban
          </button>

          <Link
            to="/dashboard/tasks"
            className="px-3 py-2 rounded-md bg-gray-50 border flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> All Tasks
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      {/* CREATE TASK (List view quick add) */}
      {view === "list" && (
        <div className="bg-white p-4 rounded shadow-sm border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreating((s) => !s)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-indigo-600 text-white"
            >
              <Plus className="w-4 h-4" /> New Task
            </button>

            {creating && (
              <div className="flex items-center gap-2 ml-4 flex-wrap">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task title"
                  className="px-3 py-2 border rounded"
                />
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="px-3 py-2 border rounded"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  onClick={createTask}
                  className="px-3 py-2 bg-green-600 text-white rounded"
                >
                  Create
                </button>
                <button
                  onClick={() => setCreating(false)}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tasks yet. Create one above.
              </div>
            ) : (
              tasks.map((t) => (
                <div
                  key={t._id}
                  className="p-3 bg-white border rounded flex items-start justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {t.title}
                    </h3>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span>{t.type ?? "Task"}</span>
                      <span>•</span>
                      <span>
                        {t.dueDate
                          ? new Date(t.dueDate).toLocaleDateString()
                          : "No due"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(t)} className="text-gray-400 hover:text-indigo-600 p-1">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <div
                      className={`px-2 py-1 text-xs text-white rounded ${getBadgeColor(
                        t.priority
                      )}`}
                    >
                      {t.priority ?? "medium"}
                    </div>
                    <div
                      className={`${t.completed ? "text-green-600" : "text-gray-400"
                        } text-sm`}
                    >
                      {t.completed ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-4 h-4" /> Done
                        </span>
                      ) : (
                        "Open"
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* KANBAN VIEW */}
      {view === "kanban" && (
        <div className="bg-white p-4 rounded shadow-sm border">
          <div className="mb-3 text-sm text-gray-600">
            Drag cards between columns — only you can see & modify your tasks.
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columnOrder.map((colKey) => (
                <div
                  key={colKey}
                  className="flex flex-col bg-gray-50 rounded p-3"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{columnTitles[colKey]}</h4>
                    <span className="text-xs text-gray-500">
                      {columns[colKey].length}
                    </span>
                  </div>

                  {/* Add Task Button for Todo Column */}
                  {colKey === "todo" && (
                    <div className="mb-2">
                      {creating ? (
                        <div className="bg-white p-2 rounded shadow border space-y-2">
                          <input
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="New task title"
                            className="w-full text-sm p-1 border rounded"
                            autoFocus
                          />
                          <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as any)}
                            className="w-full text-sm p-1 border rounded"
                          >
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                          </select>
                          <div className="flex justify-end gap-1">
                            <button onClick={() => setCreating(false)} className="px-2 py-1 text-xs border rounded">Cancel</button>
                            <button onClick={createTask} className="px-2 py-1 text-xs bg-indigo-600 text-white rounded">Add</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCreating(true)}
                          className="w-full py-1 text-sm text-gray-500 border border-dashed rounded hover:bg-gray-100 flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Task
                        </button>
                      )}
                    </div>
                  )}

                  <Droppable droppableId={colKey}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] p-1 rounded ${snapshot.isDraggingOver ? "bg-indigo-50" : ""
                          }`}
                        style={{ minHeight: 60 }}
                      >
                        {columns[colKey].map((task, idx) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={idx}
                          >
                            {(draggableProvided, dragSnapshot) => (
                              <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                                className={`mb-3 p-3 bg-white rounded shadow-sm border ${dragSnapshot.isDragging
                                  ? "ring-2 ring-indigo-300"
                                  : ""
                                  }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-sm font-medium text-gray-900 truncate">
                                      {task.title}
                                    </h5>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {task.type ?? "Task"} •{" "}
                                      {task.dueDate
                                        ? new Date(
                                          task.dueDate
                                        ).toLocaleDateString()
                                        : "No due"}
                                    </div>
                                  </div>
                                  <div className="ml-3 flex-shrink-0 flex items-center gap-2">
                                    <button onClick={() => openEditModal(task)} className="text-gray-400 hover:text-indigo-600 p-1">
                                      <Pencil className="w-3 h-3" />
                                    </button>
                                    <div
                                      className={`px-2 py-1 text-xs text-white rounded ${getBadgeColor(
                                        task.priority
                                      )}`}
                                    >
                                      {task.priority ?? "medium"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                        {columns[colKey].length === 0 && (
                          <div className="text-center text-sm text-gray-400 mt-6">
                            No tasks
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Task</h3>
              <button onClick={() => setIsEditModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={editingTask.title}
                  onChange={(e) => setEditingTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask(prev => prev ? { ...prev, priority: e.target.value as any } : null)}
                  className="mt-1 w-full p-2 border rounded"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={handleUpdateTask} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}
