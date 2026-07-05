import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    // 🔥 FIX: Add Bearer
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;