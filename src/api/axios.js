import axios from "axios";

const API = axios.create({
  baseURL: "https://ajinfoteck-backend.vercel.app/"
});

export default API;