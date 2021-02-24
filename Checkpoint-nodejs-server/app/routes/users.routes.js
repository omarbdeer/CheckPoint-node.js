module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  router.post("/user", users.createUser);
  router.get("/users", users.getUsers);
  router.put("/status", users.updateStatus);
  router.delete("/user", users.deleteUser);
  router.delete("/users", users.deleteUsers);

  app.use('', router);
};
