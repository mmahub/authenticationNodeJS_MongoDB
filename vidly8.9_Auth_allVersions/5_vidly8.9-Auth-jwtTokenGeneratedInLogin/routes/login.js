const {User} = require('../models/user');

const jwt = require('jsonwebtoken');    // loading jsonwebtoken
const _ = require('lodash');  // used to pick only selected item from user
const bcrypt = require('bcrypt');   // used for hashing password
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// });


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // used to validate the user
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // validating password by comparing entered password with entered users email password.
  const validatePassword = await bcrypt.compare(req.body.password, user.password);

  // if password not valid
  if (!validatePassword) return res.status(400).send('Invalid email or password.');

  // creating token by .sign() with first arg is payload and second arg is key.
  const token = jwt.sign( { _id: user._id }, 'jwtPrivateKey' );

  // sending jwt token in response.
  res.send(token);
});

function validate(req){
    const schema = {
        email: Joi.string().required().min(2).max(255).email(),
        password: Joi.string().required().min(2).max(255),
    }

    return Joi.validate(req, schema);
}



module.exports = router;