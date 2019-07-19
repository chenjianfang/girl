var { model } = require('mongoose');
var girlSchema = require('./schema.js');

var Girl = model('Girl', girlSchema);

module.exports = Girl;
