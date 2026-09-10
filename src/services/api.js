import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

export const getPublicDatasets = async (domain) => {
  const response = await API.get("/datasets/public", {
    params: domain ? { domain } : {},
  });

  return response.data;
};

export default API;