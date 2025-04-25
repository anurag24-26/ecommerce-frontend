import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-h0uj.onrender.com/api",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
