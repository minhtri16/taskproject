import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, deleteTask, updateTask } from "../getData";
import { fetchdataTasks } from "../getData";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

interface Task {
  id: string;
  title: string;
  content: string;
  date: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    completed: false,
  });

  const currentUser = React.useMemo(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }, []);

  useEffect(() => {
    if (!currentUser?.name) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    loadTasks();
  }, [page, limit]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetchdataTasks(page, limit);
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
    window.location.reload();
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setPage((prevPage) =>
      direction === "next" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async () => {
    if (editingTask) {
      try {
        setLoading(true);
        await updateTask(editingTask.id, editingTask);
        setEditingTask(null);
        loadTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      } finally {
        setLoading(false);
      }
    }
    if (editingTask) {
      try {
        setLoading(true);
        await updateTask(editingTask.id, editingTask);
        setEditingTask(null);
        loadTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setLoading(true);
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      await createTask(newTask);
      setNewTask({
        title: "",
        content: "",
        date: new Date().toISOString().split("T")[0],
        completed: false,
      });
      loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 dark:from-gray-600 dark:to-gray-800 text-white dark:text-gray-500 p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex flex-col w-full justify-center">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-white uppercase">
              HELLO, {currentUser?.name || "Guest"}
            </h1>
          </div>
          <div
            style={{ fontSize: "20px" }}
            className="flex justify-center py-2 text-black font-bold"
          >
            <h1>DASHBOARD</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-4 py-2 rounded shadow transition mb-5"
          >
            Logout
          </button>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
    </ThemeProvider>
        </div>
      </header>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Create New Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="border px-4 py-2 mr-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          className="border px-4 py-2 mr-2"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
        />
        <button
          onClick={handleCreateTask}
          className="bg-gradient-to-r from-pink-400 to-orange-500 hover:from-teal-500 hover:to-blue-500 text-white px-4 py-2 rounded shadow transition text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {loading ? (
          <p className="text-center text-black">Loading tasks...</p>
        ) : (
          <>
            {editingTask && (
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Edit Task</h2>
                <input
                  type="text"
                  placeholder="Title"
                  className="border px-4 py-2 mr-2"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Content"
                  className="border px-4 py-2 mr-2"
                  value={editingTask.content}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, content: e.target.value })
                  }
                />
                <div>
                  <label htmlFor="completed" className="mr-2 text-gray-700">
                    Completed:
                  </label>
                  <input
                    type="checkbox"
                    id="completed"
                    checked={editingTask.completed}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        completed: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="mr-2 text-black">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={editingTask.date}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, date: e.target.value })
                    }
                    className="border px-4 py-2 rounded"
                  />
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
            {tasks.length > 0 ? (
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{task.id}</td>
                      <td className="border px-4 py-2">{task.title}</td>
                      <td className="border px-4 py-2">{task.content}</td>
                      <td className="border px-4 py-2">{task.date}</td>
                      <td className="border px-4 py-2">
                        {task.completed ? "Completed" : "Incomplete"}
                      </td>
                      <td className="border px-4 py-2 flex justify-center">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No tasks found.</p>
            )}

            <div className="flex justify-between items-center mt-6">
              <div>
                <button
                  onClick={() => handlePageChange("prev")}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded shadow transition disabled:opacity-50"
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="mx-4">Page {page}</span>
                <button
                  onClick={() => handlePageChange("next")}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded shadow transition disabled:opacity-50"
                  disabled={tasks.length === 0}
                >
                  Next
                </button>
              </div>

              <div className="flex items-center">
                <label htmlFor="limit" className="mr-2 text-gray-700">
                  Items per page:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  className="bg-gray-100 border px-4 py-2 rounded"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
