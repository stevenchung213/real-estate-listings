const jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY || '123456';

// token verification middleware
const checkToken = (req, res, next) => {
  // console.log('check token middleware\n', req.headers);
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  } else {
    jwt.verify(token, key, (err) => {
      if (err) {
        console.error('Unauthorized token\n', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
      } else {
        next();
      }
    });
  }
};

module.exports = checkToken;
