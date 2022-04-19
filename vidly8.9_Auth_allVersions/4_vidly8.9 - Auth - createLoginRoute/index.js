const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const logins = require('./routes/login')

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly_interview')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/login', logins);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));