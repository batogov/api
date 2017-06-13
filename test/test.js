const mocha = require('mocha');
const assert = require('assert');
const mongoose = require('mongoose');

const Employee = require('../models/employee');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the db before tests run
before(function(done) {
    // Connect to mongodb
    mongoose.connect('mongodb://localhost/employees');

    mongoose.connection.once('open', function() {
        console.log('Connection has been made!');
        done();
    }).on('error', function(error) {
        console.log('Connection error: ', error);
    });
})

// Drop the employees collection before each test
beforeEach(function(done) {
    mongoose.connection.collections.employees.drop(function() {
        done();
    })
});

// Describe tests
describe('Saving records', function() {

    // Create tests
    it('Saves a record to the database', function(done) {
        let employee = new Employee({
            "name": "Simon Patterson",
            "position": "iOS Developer",
            "city": "New York",
            "available": true
        });

        employee.save().then(function() {
            assert(employee.isNew === false);
            done();
        });
    });

});