"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/app/api/taskApi";
import { Task } from "@/app/types/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();

        // adjust this depending on your backend response
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter((task) => task.status === "TODO").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const overdueTasks = tasks.filter(
    (task) => task.status !== "DONE" && new Date(task.dueDate) < new Date(),
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      color: "bg-blue-200 text-blue-600",
    },
    {
      title: "To Do",
      value: todoTasks,
      color: "bg-orange-200 text-orange-600",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      color: "bg-indigo-200 text-indigo-600",
    },
    {
      title: "Completed",
      value: completedTasks,
      color: "bg-green-200 text-green-600",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      color: "bg-red-200 text-red-600",
    },
  ];

  const total = totalTasks || 1;

  const taskOverview = [
    {
      name: "To Do",
      completed: todoTasks,
      total: totalTasks,
      width: `${(todoTasks / total) * 100}%`,
      color: "bg-slate-500",
    },
    {
      name: "In Progress",
      completed: inProgressTasks,
      total: totalTasks,
      width: `${(inProgressTasks / total) * 100}%`,
      color: "bg-blue-600",
    },
    {
      name: "Completed",
      completed: completedTasks,
      total: totalTasks,
      width: `${(completedTasks / total) * 100}%`,
      color: "bg-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-slate-100 pt-6">
      {/* Welcome */}
      <div className="px-6">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back 👋</h1>

        <p className="mt-1 text-slate-500">
          Here's what's happening with your tasks today.
        </p>  
      </div>

      {/* Top Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}
            >
              📋
            </div>

            <h3 className="text-sm text-slate-500">{item.title}</h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Task Status Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Task Status Overview
          </h2>
        </div>

        <div className="space-y-8">
          {taskOverview.map((item) => (
            <div key={item.name}>
              <div className="mb-3 flex justify-between">
                <span className="font-medium text-slate-950">{item.name}</span>

                <span className="text-sm text-slate-500">
                  {item.completed}/{item.total} Tasks
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{
                    width: item.width,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
