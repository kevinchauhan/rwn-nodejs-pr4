const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/kevinbookstore'

const connectDb = async () => {
    try {
        await mongoose.connect(url)
        console.log('db connection successfull...')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDb }
