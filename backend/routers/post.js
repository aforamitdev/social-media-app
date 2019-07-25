const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
} = require("../controllers/post");
const { createPostalidator } = require("../validation");
const { requireSignin } = require("../controllers/auth");
const { userById, hasAuthrozition } = require("../controllers/user");

const router = express.Router();

router.get("/post", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostalidator);

router.get("/posts/by/:userId", requireSignin, postByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);

router.delete("/post/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
