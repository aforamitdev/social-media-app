const User = require("../models/user");
const _ = require("lodash");
const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Fount"
      });
    }
    req.profile = user; //add profile object in req with user info
    next();
  });
};

const hasAuthrozition = (req, res, next) => {
  const authrozition =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authrozition) {
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
};

const alluser = (req, res) => {
  User.find((err, users) => {
    if (err)
      return res.status(400).json({
        error: err
      });
    res.json({ users });
  }).select("name email created updated");
};

const getuser = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

const updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.update = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorize to perform  this action "
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};
const deleteuser = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "user Deleted " });
  });
};
module.exports = {
  userById,
  hasAuthrozition,
  alluser,
  getuser,
  updateUser,
  deleteuser
};
