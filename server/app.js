const express = require('express');
const path = require('path');

const app = express();

// body parsing
app.use(express.json())

// api routes
// app.use('/api', require('./api'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

module.exports = app;
