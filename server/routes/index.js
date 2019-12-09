require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const checkToken = require('../middleware');
const { Properties, Users } = require('../../db');

const router = express.Router();
const key = process.env.JWT_KEY || '123456';

router.post('/register', (req, res) => {
  console.log(`body: ${JSON.stringify(req.body)}`)
  const { username, password, admin } = req.body;
  // check if user exists in database
  Users.find({ username }).exec()
    .then((resp) => {
      // if user does NOT exist
      if (resp.length === 0) {
        // create new user document
        const newUser = new Users({ username, password, admin });
        newUser.save()
          .then(() => res.status(200).json({ payload: 'registration', username }))
          .catch(err => console.error(`error: saving new user\n${err}`));
      } else {
        // if user EXISTS
        res.status(403).json({
          message: `username already exists:\n ${username}`,
        });
      }
    })
    .catch((err) => {
      console.error(`error: registration POST request from route ${req.originalUrl} at ${req.url}\n${err}`);
      res.status(500).json({
        message: `Error occurred during the registration process at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.post('/login', (req, res) => {
  console.log(`body: ${req.body}`)
  const { username, password } = req.body;
  Users.findOne({ username }).exec()
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.error(`error at login: comparing user password\n${err}`);
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
            admin: user.admin,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials', error: err });
        }
      });
    })
    .catch((err) => {
      console.error(`error caught: ${req.method} request at ${req.originalUrl}\n${err}`);
      res.status(500).json({
        message: `Internal server error at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.post('/listings', checkToken, (req, res) => {
  console.log(`body: ${req.body}\nparams: ${req.params}`)
  // save Properties document to db
  const documentsArr = req.body;
  Properties.insertMany(documentsArr, (err, docs) => {
    if (err) {
      console.error(`error: while inserting documents at ${req.originalUrl}\n`, err);
      res.status(500).json({
        message: `An error occurred while saving listings at ${req.originalUrl}`,
        error: err,
      });
    } else {
      res.status(200).json({
        payload: docs,
      });
    }
  });
});

router.get('/listings', checkToken, (req, res) => {
  console.log(`body: ${req.body}\nparams: ${req.params}`)
  Properties.find({}).exec()
    .then((docs) => {
      res.status(200).json({
        payload: docs,
      });
    })
    .catch((err) => {
      console.error(`error: while fetching documents at ${req.originalUrl}\n`, err);
      res.status(500).json({
        message: `An error occurred while fetching listings at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.patch('/listings/:id', checkToken, (req, res) => {
  console.log(`body: ${req.body}\nparams: ${req.params}`)
  const propertyID = req.params.id;
  const propertyData = req.body;
  Properties.update({ _id: propertyID }, { $set: propertyData }).exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        payload: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: `An error occurred while updating a listing at ${req.originalUrl}`,
        error: err,
      });
    });
});

router.get('/users', checkToken, (req, res) => {
  console.log(`body: ${req.body}\nparams: ${req.params}`)
  Users.find({}).exec()
    .then((docs) => {
      res.status(200).json({
        payload: docs,
      });
    })
    .catch((err) => {
      console.error(`error: while fetching users at ${req.originalUrl}\n`, err);
      res.status(500).json({
        message: `An error occurred while fetching users at ${req.originalUrl}`,
        error: err,
      });
    });
});

module.exports = router;
