const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost
} = require("../controllers/post");
const { createPostalidator } = require("../validation");
const { requireSignin } = require("../controllers/auth");
const { userById, hasAuthrozition } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostalidator);

router.get("/posts/by/:userId", requireSignin, postByUser);

router.delete("/post/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
