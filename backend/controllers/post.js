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
module.exports = {
  getPosts,
  createPost,
  postByUser
};
