const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  }
  catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = router;