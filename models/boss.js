const db = require('../config/db');

const Boss = db.model('Boss', {
    name:String,
    dateOfBirth:Date,
    nickName:String,
    wealth:Number,
    picture:String
});

module.exports = Boss;