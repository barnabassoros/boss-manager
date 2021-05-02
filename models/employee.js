const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Employee = db.model('Employee', {
    name:String,
    dateOfBirth:Date,
    profession:String,
    succesRate:Number,
    loyalty:Number,
    picture:String,
    _employer: {
        type: Schema.Types.ObjectId,
        ref: 'Boss'
    }
});

module.exports = Employee;