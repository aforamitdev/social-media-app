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
  post.save().then(result => {
    res.status(200).json({
      post: result
    });
  });
};

module.exports = {
  getPosts,
  createPost
};
