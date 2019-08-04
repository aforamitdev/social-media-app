const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userValidator } = require("../validation");
const { userById } = require("../controllers/user");
const router = express.Router();

router.post("/signup",userValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
//any route containing :userById, app will first execute userById
router.param("userId", userById);

module.exports = router;
