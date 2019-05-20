const mongoose = require('mongoose');
const Schema = require('../schema/imgUp');

module.exports = mongoose.model('imgUrl', Schema);