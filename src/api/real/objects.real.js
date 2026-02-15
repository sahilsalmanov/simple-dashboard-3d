import axios from "axios";

export const getObjects = async () => {
  const response = await axios.get("/api/objects");
  return response.data;
};

export const addObject = async (data) => {
  const response = await axios.post("/api/objects", data);
  return response.data;
};

export const updateObject = async (data) => {
  const response = await axios.put(`/api/objects/${data.id}`, data);
  return response.data;
};

export const deleteObject = async (id) => {
  await axios.delete(`/api/objects/${id}`);
  return { success: true, id };
};
