const {Genre, validate} = require('../models/genre');
const {User, validateUser} = require('../models/user')

const _ = require('lodash');  // used to pick only selected item from user
const bcrypt = require('bcrypt');   // used for hashing password
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

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  // });

  // will work same as above method, just using lodash - "_" 
  user = new User( _.pick(req.body, ['name', 'email', 'password'] ) );
  
  //  generating salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // hashing password with generated salt and setting that hashed password to User 
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // used to pick only selected item from user (i.e: ['_id', 'name', 'email']), not selecting password because we dont wont to send password to anyone.
  res.send( _.pick(user, ['_id', 'name', 'email']) );
});


module.exports = router;