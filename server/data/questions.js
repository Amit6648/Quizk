const mongoose  = require('mongoose');
const questionssch = mongoose.Schema({});

module.exports = mongoose.model('questions', questionssch);
