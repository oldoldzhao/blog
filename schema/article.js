const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    type: String,
    time: String,
    content: String,
    abstract: String,
    imgId: String
})