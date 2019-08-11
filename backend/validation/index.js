const createPostalidator = (req, res, next) => {
  req.check("title", "title is require").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 105
  });

  req.check("body", "Body is require").notEmpty();
  req.check("body", "Body must be between 4 to 1000 characters").isLength({
    min: 4,
    max: 1000
  });

  const errors = req.validationErrors()[0];
  if (errors) {
    return res.status(400).json({ errors: errors.msg });
  }
  next();
};

const userValidator = (req, res, next) => {
  req.check("name", "Name is require").notEmpty();
  req
    .check("email", "Email Must be between 3 to 32 char")
    .matches(/.+\@.+\..+/)
    .withMessage("Email Must Contain @")
    .isLength({ min: 4, max: 2000 });
  req.check("password", "password is require").notEmpty();
  req
    .check("password", "password Must be between 3 to 32 char")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  const errors = req.validationErrors()[0];
  if (errors) {
    return res.status(400).json({ error: errors.msg });
  }
  next();
};
module.exports = {
  createPostalidator,
  userValidator
};
