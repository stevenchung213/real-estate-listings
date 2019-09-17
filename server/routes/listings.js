require('dotenv').config();
const express = require('express'),
  jwt = require('jsonwebtoken'),
  { Users, Properties, Notes } = require('../../db'),
  router = express.Router(),
  key = process.env.JWT_KEY || 'testing';

// token verification middleware
const checkToken = (req, res, next) => {
  console.log('check token middleware\n', req.headers)
  const header = req.headers.authorization;
  // if authorization header exists
  if (typeof header !== 'undefined') {
    // header = ['Bearer', '${token}']
    // req.token = '${token}'
    req.token = header.split(' ')[1];
    next();
  } else {
    res.status(403).json({ message: 'Invalid token' });
  }
};

router.use((req, res, next) => {
  console.log(`incoming ${req.method} request to /api/seiPrep`);
  next();
});

router.post('/register', (req, res) => {
  console.log(`post request from ${req.originalUrl}\n at /register`, req.body);
  const { username, password } = req.body;
  // check if student exists in database
  Users.find({ username }).exec()
    .then(resp => {
      // if student does NOT exist
      if (resp.length === 0) {
        // create new student document
        const newUser = new Users({ username, password });
        newUser.save()
          .then(() => res.status(200).json({ success: 'registration', username }))
          .catch(err => console.log(`error: saving new user\n${err}`));
      } else {
        // if student EXISTS
        res.status(400).json({
          message: `username already exists:\n ${username}`
        });
      }
    })
    .catch(err => {
      console.log(`error: registration POST request from route ${req.originalUrl} at /register\n${err}`);
      res.status(500).json({
        error: 'error: registration process'
      });
    });
});

router.post('/login', (req, res) => {
  console.log(`post request from ${req.originalUrl} at /login\n`, req.body);
  const { username, password, present } = req.body;
  Users.findOne({ username }).exec()
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.log(`error: comparing user password\n${err}`);
          res.status(500).json({ message: 'Internal error at /login' });
        }
        // isMatch ? sign jwt and send : login failed
        if (isMatch) {
          // console.log('user document\n', user)
          // sign token and send
          const token = jwt.sign({ userID: user._id }, key, { expiresIn: 60 });
          res.status(200).json({
            userID: user._id,
            username: user.username,
            token
          });
        } else {
          res.status(403).json({ message: 'Invalid credentials' });
        }
      })
    })
    .catch(err => res.status(500).json({ message: 'Internal Server Error: /login', error: err }))
});

// router.get('/data', checkToken, (req, res) => {
//   console.log(req.headers, '\n')
//   jwt.verify(req.token, key, (err, authorizedData) => {
//     if (err) {
//       console.log(`error: could not verify at protected route /data\n`, err);
//       res.status(403).json({ message: `Token might have expired`, error: err });
//     } else {
//       console.log('authorized data\n', authorizedData)
//       const { studentID } = authorizedData;
//       User.findOne({ _id: studentID }).exec()
//         .then(doc => {
//           const { _id, username, attendance, cohort } = doc;
//           const studentData = {
//             studentID: _id,
//             username,
//             cohort,
//             attendance: formatAttendance(attendance)
//           };
//           res.status(200).json(studentData)
//         })
//         .catch(err => console.log(`error: database query\n`, err));
//       // res.status(200).json({ message: `Successful verification at route /data`, data: authorizedData });
//     }
//   });
// });

module.exports = router;
