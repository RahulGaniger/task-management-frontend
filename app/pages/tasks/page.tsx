"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import TaskCard from "@/app/components/task/TaskCard";
import { getTasks, deleteTask } from "@/app/api/taskApi";
import CreateTaskModal from "./CreateTask";
import Sidebar from "@/app/components/Sidebar";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks({
        status,
        priority,
      });

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, priority]);

  const filteredTasks = tasks.filter((task: any) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    await deleteTask(id);

    fetchTasks();
  };

  return (
    <>
      <div className="ml-64 min-h-screen bg-slate-100 ">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>

            <p className="text-slate-500">Manage and organize your work.</p>
          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setOpen(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            + New Task
          </button>
        </div>

        <CreateTaskModal
          isOpen={open}
          task={selectedTask}
          onClose={() => {
            setOpen(false);
            setSelectedTask(null);
          }}
          onSuccess={fetchTasks}
        />

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={16}
            />

            <input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-100 rounded-lg bg-slate-100 py-2 pl-10 pr-4"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg bg-slate-100 px-3 py-2"
          >
            <option value="">Status: All</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg bg-slate-100 px-3 py-2"
          >
            <option value="">Priority: All</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Tasks */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task: any) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}
