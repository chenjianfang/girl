var { Schema } = require('mongoose');
require('./connections');
var girlSchema = new Schema({
    id: String,
    account: String,
    password: String,
    name: String,
    gender: Number,
    age: Number,
    school: String,
    location: Array,
    label: Array,
});

module.exports = girlSchema;
