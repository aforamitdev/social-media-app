const Post = require("../models/post");
const getPosts = (req, res) => {
  Post.find()
    .select("_id title body")
    .then(post => {
      res.json({ post: post });
    })
    .catch(err => {
      console.log(err);
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
