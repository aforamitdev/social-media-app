const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { createPostalidator } = require("../validation");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", createPostalidator, createPost);

module.exports = router;
