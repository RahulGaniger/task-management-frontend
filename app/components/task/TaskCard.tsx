import { Calendar, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const priorityColors = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-orange-100 text-orange-700",
    LOW: "bg-blue-100 text-blue-700",
  };

  const statusColors = {
    TODO: "bg-gray-100 text-gray-700",
    IN_PROGRESS: "bg-indigo-100 text-indigo-700",
    DONE: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-xl  bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex justify-between">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            priorityColors[task.priority as keyof typeof priorityColors]
          }`}
        >
          {task.priority}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusColors[task.status as keyof typeof statusColors]
          }`}
        >
          {task.status}
        </span>
      </div>

      <h3 className="mb-2 font-semibold text-slate-900">{task.title}</h3>

      <p className="mb-5 line-clamp-3 text-sm text-slate-500">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={14} />

          {new Date(task.dueDate).toLocaleDateString()}
        </div>

        <div className="flex gap-3">
          <button onClick={() => onEdit(task)}>
            <Pencil size={16} className="text-blue-600 hover:text-blue-800" />
          </button>

          <button onClick={() => onDelete(task.id)}>
            <Trash2 size={16} className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      </div>
    </div>
  );
}
