const express = require("express");

const {
  alluser,
  getuser,
  userById,
  updateUser,
  deleteuser
} = require("../controllers/user");

const router = express.Router();

router.get("/users", alluser);
router.get("/user/:userId", getuser);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteuser);
router.param("userId", userById);

module.exports = router;
