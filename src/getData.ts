import axios from "axios";

const api = axios.create({
  baseURL: "https://673ce3064db5a341d8334cc9.mockapi.io",
});

export const fetchdataTasks = (page: number, limit: number) => {
  return api.get("/tasks", {
    params: { page, limit },
  });
};

export const createTask = (task: { title: string; content: string; date: string; completed: boolean }) => {
  return api.post("/tasks", task);
};

export const updateTask = (id: string, updatedData: Partial<{ title: string; content: string; date: string; completed: boolean }>) => {
  return api.put(`/tasks/${id}`, updatedData);
};


export const deleteTask = (id: string) => {
  return api.delete(`/tasks/${id}`);
};
