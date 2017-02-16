const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.set('debug', true);
const connection = mongoose.createConnection('mongodb://localhost:27017/ct_db');

module.exports = connection;