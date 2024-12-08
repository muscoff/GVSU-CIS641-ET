const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')

const {readJsonFile} = require('./config/logFunc')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(express.json({ extended: true }))

app.use('/api/login', require('./api/login'))
app.use('/api/admin/login', require('./api/admin_login'))
app.use('/api/products', require('./api/product'))
app.use('/api/checkout', require('./api/checkout'))
app.use('/api/orders', require('./api/orders'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'images')))

app.get('/', (req, res) => {
    try{
    const loginDb = readJsonFile('logindb.js')
    console.log(loginDb)
    res.json({status: true})
    }catch(err){
        console.error(err.message)
        res.status(500).json({status: false, err: err.message, message: 'Server error'})
    }
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json({message: req.body})
})

const server = http.createServer(app)

server.listen(PORT, ()=>console.log(`App running on localhost:${PORT}`))
