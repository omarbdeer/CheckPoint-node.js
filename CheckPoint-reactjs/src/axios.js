import axios from "axios";

export default axios.create({
  baseURL: "https://fullstack-users.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});
