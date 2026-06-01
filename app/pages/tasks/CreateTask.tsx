"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createTask, updateTask } from "@/app/api/taskApi";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  task?: any;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSuccess,
  task,
}: Props) {
  const [loading, setLoading] = useState(false);

  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "TODO",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        priority: task.priority || "LOW",
        status: task.status || "TODO",
      });
    } else {
      setFormData(initialState);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (task) {
        await updateTask(task.id, formData);

        toast.success("Task updated successfully");
      } else {
        await createTask(formData);

        toast.success("Task created successfully");
      }

      onSuccess?.();

      onClose();

      setFormData(initialState);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl text-black">
        {/* Header */}
        <div className="flex items-start justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {task ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add details to organize your work session.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Task title</label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full rounded-md border border-slate-300 px-2 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Detailed description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Add notes, links, or specific requirements..."
              className="w-full rounded-md border border-slate-300 px-2 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {/* Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Due date</label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              >
                <option value="LOW">Low</option>

                <option value="MEDIUM">Medium</option>

                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Status */}
          {task && (
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-4 py-2"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3  pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-5 py-2 text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? task
                  ? "Updating..."
                  : "Saving..."
                : task
                  ? "Update Task"
                  : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
