const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create employee schema & model
const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    position: {
        type: String,
        required: [true, 'Position field is required']
    },
    city: {
        type: String,
        required: [true, 'City field is required']
    },
    available: {
        type: Boolean,
        default: false,
        required: [true, 'Available field is required']
    }
});

const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;