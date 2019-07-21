const Post = require("../models/post");
const getPosts = (req, res) => {
  res.json({
    posts: [
      { title: "first Post" },
      { title: "second Post" },
      { title: "third Post" }
    ]
  });
};

const createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.status(200).json({
      message: result
    });
  });
};

module.exports = {
  getPosts,
  createPost
};
