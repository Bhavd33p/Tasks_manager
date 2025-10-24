import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5202",
  headers: { "Content-Type": "application/json" }
});

export type Task = { id: string; description: string; isCompleted: boolean };

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/api/tasks");
  return res.data;
};

export const addTask = async (description: string): Promise<Task> => {
  const res = await api.post<Task>("/api/tasks", { description });
  return res.data;
};

export const updateTask = async (id: string, patch: Partial<Task>): Promise<Task> => {
  const res = await api.put<Task>(`/api/tasks/${id}`, patch);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};
