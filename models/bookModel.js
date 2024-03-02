const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    booktype: String,
    author: String,
    pyear: String,
    stock: Number,
    price: Number


}, { timestamps: true })

module.exports = mongoose.model('books', bookSchema)