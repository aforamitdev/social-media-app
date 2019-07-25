const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt"); // for protected routes

const signup = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) return res.status(403).json({ error: "Email is Tasken " });

  const user = await new User(req.body);

  await user.save();

  res.status(200).json({ user });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "user with that email does not exist, please signup"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    //generating cookie
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    return res.json({ token, user: { name, email } });
  });
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Singout Sucess!" });
};

const requireSignin = expressjwt({
  secret: process.env.JWT_TOKEN,
  // if the token is valid, express jwt appends the varified user id
  // in the auth key the request object
  userProperty: "auth"
});
module.exports = {
  signup,
  signin,
  signout,
  requireSignin
};
