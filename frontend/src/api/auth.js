import axios from "axios";

export const api = axios.create({
  baseURL: "https://ddas.onrender.com/api/auth",

});
