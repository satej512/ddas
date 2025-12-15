import axios from "axios";

const api = axios.create({
  baseURL: "https://ddas.onrender.com/api", // your backend URL
});

export const uploadFile = (formData) =>
  api.post("/files/upload", formData);

export const getFiles = () =>
  api.get("/files");
