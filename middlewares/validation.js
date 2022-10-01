const validation = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = validation;
