const db = require("../models");
const Users = db.users;

const create = (user, condition) => {
  return Users
    .findOne({ where: condition })
    .then((obj) => {
        if(obj)
            return obj;
        return Users.create(user);
    })
}

// Create and Save a new User
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!"
    });
    return;
  }

  const user = {
    email: req.body.email,
    username: req.body.email,
  };

  create(user, { email: user.email })
    .then(function(result){
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.getUsers = (req, res) => {
  Users.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Update a user by the status in the request
exports.updateStatus = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.status) {
    res.status(400).send({
      message: "Email and Status can not be empty!"
    });
    return;
  }

  const email = req.body.email;
  const status = req.body.status;

  Users.update({status: status}, {
    where: { email: email }
  })
    .then((numUpdated) => {
      res.send({ status: 'success' })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user status"
      });
    });
};

// Retrieve all Users from the database.
exports.deleteUser = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!"
    });
    return;
  }

  const email = req.body.email;

  Users.destroy({
    where: { email: email }
  })
    .then((numDeleted) => {
      res.send({ status: 'success' });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while delete user."
      });
    });
};