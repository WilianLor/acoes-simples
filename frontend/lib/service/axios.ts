import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3031",
  headers: {
    "Content-Type": "application/json",
  },
});
