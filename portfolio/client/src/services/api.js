import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ""}/api`,
  withCredentials: true, // send the HTTP-only auth cookie
  timeout: 15000,
});

// Normalise errors so components can just read `error.message`.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === "ECONNABORTED" ? "Request timed out" : null) ||
      (error.request ? "Cannot reach the server" : error.message);

    return Promise.reject({
      message,
      status: error.response?.status,
      details: error.response?.data?.details,
    });
  }
);

export default api;