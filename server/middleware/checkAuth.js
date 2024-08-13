const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    } else {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
  }
};