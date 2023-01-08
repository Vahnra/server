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
          err.message || "Une erreur s'est produite lors de la récupération des utilisateurs."
      });
    });
};

// Find one user
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Utilisateur non trouvé avec l'id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Une erreur s'est produite lors de la récupération de l'utilisateur: " + id });
    });
};

// Update a user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Aucune info a modifié n'a été envoyé!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `L'utilisateur ${id} n'a pas pu être modifié. Peut être que l'utilisateur n'a pas été trouvé!`
        });
      } else res.send({ message: "L'utilisateur a été modifié avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur s'est produite lors de la modification de l'utilisateur " + id
      });
    });
};

// Add a friend
exports.addFriend = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Information vide!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, { $push: { friends: { username: req.body.username, role: req.body.role, id: req.body.id } } }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `L'utilisateur ${id} n'a pas pu être modifié. Peut être que l'utilisateur n'a pas été trouvé!`
        });
      } else res.send({ message: "L'utilisateur a été modifié avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur s'est produite lors de la modification de l'utilisateur " + id
      });
    });
};

// Delete a friend
exports.deleteFriend = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Information vide!"
    });
  }

  const id = req.params.id;

  User.updateOne(id, { $pullAll: { friends: { _id: req.body._id } } }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `L'utilisateur ${id} n'a pas pu être modifié. Peut être que l'utilisateur n'a pas été trouvé!`
        });
      } else res.send({ message: "L'ami a été supprimé avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur s'est produite lors de la modification de l'utilisateur " + id
      });
    });
};

