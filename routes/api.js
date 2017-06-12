const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Get the list of employees from the DB
router.get('/employees', function(req, res, next) {
    queryParameters = req.query;

    Object.keys(queryParameters).forEach(function(key) {
        if (queryParameters[key] === 'All') delete queryParameters[key];
    });

    Employee.find(queryParameters).sort({ available: -1 }).then(function(employees) {
        res.send(employees);
    });
});

// Add a new employee to the DB
router.post('/employees', function(req, res, next) {
    // var employee = new Employee(req.body);
    // Employee.save();
    Employee.create(req.body).then(function(employee) {
        res.send(employee);
    }).catch(next);
});

// Update the employee in the DB
router.put('/employees/:id', function(req, res, next) {
    Employee.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Employee.findOne({_id: req.params.id}).then(function(employee) {
            res.send(employee);
        });
    });
});

// Delete a employee from the DB
router.delete('/employees/:id', function(req, res, next) {
    Employee.findByIdAndRemove({_id: req.params.id}).then(function(employee) {
        res.send(employee);
    });
});

module.exports = router;