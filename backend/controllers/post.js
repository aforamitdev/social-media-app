const _ = require("lodash");
const formidable = require("formidable");
const Post = require("../models/post");
const fs = require("fs");
const getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then(post => {
      res.json({ post: post });
    })
    .catch(err => {
      console.log(err);
    });
};

const createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Could not be uploaded"
      });
    }
    let post = new Post(fields);
    post.postedBy = req.profile; //  postedby is assined as currend user

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};
const postByUser = (req, res) => {
  // search and populate by "postedBy"
  Post.find({ postedBy: req.profile.id })
    .populate("postedBy", "_id name")

    .exec((err, posts) => {
      if (err) return res.status(400).json({ error: err });
      res.json(posts);
    });
};

const postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({ error: err });
      }
      req.post = post;
      next();
    });
};

const isPoster = (req, res) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id === req.auth._id;
  if (!isPoster) {
    return res.status(403).json({
      error: "user is not authorize"
    });
  }
  next();
};

const deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: "post deleted sucessfully"
    });
  });
};

const updatePost = (req, res) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.update = Date.node;
  post.save(err => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
  });
  res.json({ post });
};

module.exports = {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost
};
