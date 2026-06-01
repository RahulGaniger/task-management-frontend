export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string;
  createdAt: string;
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  userId?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate: string;
}