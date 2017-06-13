const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up express app
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/employees');

mongoose.connection.once('open', function() {
    console.log('Connection has been made!');
}).on('error', function(error) {
    console.log('Connection error: ', error);
});

// ES6 Promises
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.static('dist'));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

// Error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message });
});

// Listen for requests
app.listen(4000, function() {
    console.log('Now listening for requests!');
});