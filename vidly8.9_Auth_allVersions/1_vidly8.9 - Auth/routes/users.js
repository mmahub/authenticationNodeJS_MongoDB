const {Genre, validate} = require('../models/genre');
const {User, validateUser} = require('../models/user')

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// });

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  /*
  1) this part will check if user with same email is already exist or not.
  2) and if user is already exist it will throw an error that user already exist.
  */ 
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  });

  await user.save();

  res.send(user);
});


module.exports = router;