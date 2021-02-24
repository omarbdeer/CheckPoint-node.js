import myAxios from "./axios";

const login = (email) => {
  return myAxios.post("/user", {email: email});
};

const getUsers = () => {
  return myAxios.get("/users");
};

const updateStatus = (email, status) => {
  return myAxios.put("/status", {email: email, status: status});
};

const deleteUser = (email) => {
  return myAxios.del("/user", {email: email});
};

export default {
  login,
  getUsers,
  updateStatus,
  deleteUser,
};
