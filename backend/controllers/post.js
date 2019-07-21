const getPosts = (req, res) => {
  res.json({
    posts: [
      { title: "first Post" },
      { title: "second Post" },
      { title: "third Post" }
    ]
  });
};

module.exports = {
  getPosts
};
