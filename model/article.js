const mongoose = require('mongoose');
const Schemas = require('../schema/article')

module.exports = mongoose.model('article', Schemas);