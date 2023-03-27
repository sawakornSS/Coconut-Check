const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
  // Insert Register Data
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fname: req.body.firstname,
    lname: req.body.lastname,
  };

  // Save User in the database
  User.create(user) //basic query sequelize
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "error register",
      });
    });
};

// findUser check username and password
exports.findUser = (req, res) => {
  // object 
  const userpass = {
    username: req.body.username,
    password: req.body.password,
  };

  // find data where userpass
  User.findOne({where : userpass }) //basic query sequelize
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "error login",
      });
    });
};
