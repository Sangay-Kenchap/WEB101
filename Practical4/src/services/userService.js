import api from "@/lib/api-config";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const followUser = async (id) => {
  const response = await api.post(`/users/${id}/follow`);
  return response.data;
};