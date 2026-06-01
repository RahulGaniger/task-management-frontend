import api from "./api";
import { TaskFilters, Task, CreateTaskPayload } from "@/app/types/task";

/**
 * Get All Tasks
 */
export const getTasks = async (filters?: TaskFilters): Promise<Task[]> => {
  const response = await api.get("/tasks", {
    params: filters,
  });

  return response.data;
};

/**
 * Get Single Task
 */
export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);

  return response.data;
};

/**
 * Create Task
 */
export const createTask = async (data: CreateTaskPayload): Promise<Task> => {
  const response = await api.post("/tasks", data);

  return response.data;
};

/**
 * Update Task
 */
export const updateTask = async (
  id: string,
  data: Partial<CreateTaskPayload>,
): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, data);

  return response.data;
};

/**
 * Delete Task
 */
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
