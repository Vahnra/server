const User = require("../models/user.model");
const mongoose = require("mongoose");

// Find all user
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  User.find(condition)
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

// Find one user
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Add a friend
exports.addFriend = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, { $push: { friends: { username: req.body.username, role: req.body.role, id: req.body.id } } }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a friend
exports.deleteFriend = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.updateOne(id, { $pullAll: { friends: { _id: req.body._id } } }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete friend with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "Friend was deleted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating friend with id=" + id
      });
    });
};

