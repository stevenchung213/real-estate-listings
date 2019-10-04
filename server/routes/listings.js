require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Users, Properties, Notes } = require('../../db');

const router = express.Router();
const key = process.env.JWT_KEY;

// token verification middleware
const checkToken = (req, res, next) => {
  console.log('check token middleware\n', req.headers);
  // const token =req.body.token ||req.query.token ||req.headers['x-access-token'] ||req.cookies.token;
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  console.log(token);
  if (!token) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa');
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  } else {
    jwt.verify(token, key, (err, success) => {
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb');
      if (err) {
        console.log('cccccccccccccccccccccc\n', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
      } else {
        next();
      }
    });
  }
  // const header = req.headers.authorization;
  // // if authorization header exists
  // if (typeof header !== 'undefined') {
  //   // header = ['Bearer', '${token}']
  //   // req.token = '${token}'
  //   req.token = header.split(' ')[1];
  //   next();
  // } else {
  //   res.status(403).json({ message: 'Invalid token' });
  // }
};

router.use((req, res, next) => {
  console.log(`incoming ${req.method} request at ${req.originalUrl}`);
  next();
});

router.post('/register', (req, res) => {
  console.log(`post request from ${req.originalUrl}\n at ${req.url}`, req.body);
  const { username, password } = req.body;
  // check if user exists in database
  Users.find({ username }).exec()
    .then((resp) => {
      // if user does NOT exist
      if (resp.length === 0) {
        // create new user document
        const newUser = new Users({ username, password });
        newUser.save()
          .then(() => res.status(200).json({ success: 'registration', username }))
          .catch(err => console.log(`error: saving new user\n${err}`));
      } else {
        // if user EXISTS
        res.status(403).json({
          message: `username already exists:\n ${username}`,
        });
      }
    })
    .catch((err) => {
      console.log(`error: registration POST request from route ${req.originalUrl} at ${req.url}\n${err}`);
      res.status(500).json({
        message: `Error occurred during the registration process at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.post('/login', (req, res) => {
  console.log(`post request from ${req.originalUrl} at ${req.url}\n`, req.body);
  const { username, password } = req.body;
  Users.findOne({ username }).exec()
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.log(`error at login: comparing user password\n${err}`);
          res.status(500).json({ message: 'Internal server error' });
        }
        // isMatch ? sign jwt and send : login failed
        if (isMatch) {
          console.log('user document\n', user);
          // sign token and send
          const token = jwt.sign({ userID: user._id }, key, { expiresIn: 1800000 });
          res.status(200).json({
            userID: user._id,
            username: user.username,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials', error: err });
        }
      });
    })
    .catch((err) => {
      console.log(`error caught: ${req.method} request at ${req.originalUrl}\n${err}`);
      res.status(500).json({
        message: `Internal server error at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.post('/listings', checkToken, (req, res) => {
  console.log(`post request at ${req.originalUrl}\n`, req.body);
  // save Properties document to db
  const documentsArr = req.body;
  Properties.insertMany(documentsArr, (err, docs) => {
    if (err) {
      console.log(`error: while inserting at ${req.originalUrl}\n`, err);
      res.status(409).json({
        message: `Duplicate property conflict error at ${req.originalUrl}`,
        error: err,
      });
    } else {
      res.status(200).json({
        success: docs,
      });
    }
  });
});

router.get('/listings', checkToken, (req, res) => {
  console.log(`get request at ${req.originalUrl}\n`, req.body);
});

// router.get('/data', checkToken, (req, res) => {
//   console.log(req.headers, '\n')
//   jwt.verify(req.token, key, (err, authorizedData) => {
//     if (err) {
//       console.log(`error: could not verify at protected route /data\n`, err);
//       res.status(403).json({ message: `Token might have expired`, error: err });
//     } else {
//       console.log('authorized data\n', authorizedData)
//       const { userID } = authorizedData;
//       User.findOne({ _id: userID }).exec()
//         .then(doc => {
//           const { _id, username } = doc;
//           const userData = {
//             userID: _id,
//             username,
//           };
//           res.status(200).json(userData)
//         })
//         .catch(err => console.log(`error: database query\n`, err));
//       // res.status(200).json({ message: `Successful verification at route /data`, data: authorizedData });
//     }
//   });
// });

module.exports = router;
