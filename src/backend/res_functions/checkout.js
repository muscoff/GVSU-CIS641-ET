const { readJsonFile, writeJsonFile } = require('../config/logFunc')

const checkout = (req, res) => {
    const file_path = 'cart.json'
    const cartDB = readJsonFile(file_path)
    const {cart, details} = req.body
    const date = new Date().toLocaleDateString()
    const admins = []
    cart.forEach(c=>{
        if(!admins.includes(c.admin)) admins.push(c.admin)
    })
    const item = {date, cart, details, admins, user: details.email}
    const saveDB = [...cartDB, item]
    const status = writeJsonFile(file_path, saveDB)
    const message = `Order was${status? '':' not'} created successfully`
    res.json({status, message})
}

module.exports = {
    checkout
}