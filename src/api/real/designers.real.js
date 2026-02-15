import axios from "axios";

export const getDesigners = async () => {
  const response = await axios.get("/api/designers");
  return response.data;
};

export const addDesigner = async (data) => {
  const response = await axios.post("/api/designers", data);
  return response.data;
};
