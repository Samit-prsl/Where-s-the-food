const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const header = req.headers.authorization;

  if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

module.exports = auth;
