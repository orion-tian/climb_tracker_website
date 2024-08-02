const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json("You are not authenticated.");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};