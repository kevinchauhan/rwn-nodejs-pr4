const express = require('express')
const app = express()
const { connectDb } = require('./config/db')
const bookModel = require('./models/bookModel')
const PORT = 5000

// db connection
connectDb()

// template engine
app.set('view engine', 'ejs')

// body parser
app.use(express.urlencoded({ extended: false }))

// routes
// get all books
app.get('/', async (req, res) => {
    try {
        const books = await bookModel.find()
        res.render('pages/index', { books })
    } catch (error) {
        console.log('error')
    }
})
// add book page
app.get('/add', (req, res) => {
    res.render('pages/add')
})
// insert book
app.post('/add', async (req, res) => {
    try {
        const books = await bookModel(req.body)
        await books.save()
    } catch (error) {
        console.log('error')
    }
    res.redirect('/')
})
// edit book page
app.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    try {
        const books = await bookModel.findOne({ _id: id })
        res.render('pages/edit', { books })
    } catch (error) {
        console.log(error)
    }
})
// update book
app.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    try {
        const books = await bookModel.updateOne({ _id: id }, req.body)
    } catch (error) {
        console.log(error)
    }
    res.redirect('/')
})
// delete book
app.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const books = await bookModel.deleteOne({ _id: id })
    } catch (error) {
        console.log(error)
    }
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})