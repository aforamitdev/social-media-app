const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { createPostalidator } = require("../validation");
const { requireSignin } = require("../controllers/auth");
const { userById, hasAuthrozition } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, createPostalidator, createPost);
router.param("userId", userById);

module.exports = router;
