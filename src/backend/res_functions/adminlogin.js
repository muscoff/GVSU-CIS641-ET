const bcrypt = require('bcrypt')
const {readJsonFile, writeJsonFile} = require('../config/logFunc')
const Login = (req, res) => {
    const {username, password} = req.body
    const file_name = 'adminlogindb.js'
    const user_info_file_name = 'userinfodb.js'
    const userDb = readJsonFile(user_info_file_name)
    const findUserInfo = userDb.find(item=>item.email.toLowerCase() === username.toLowerCase())
    const loginDb = readJsonFile(file_name)
    const findUser = loginDb.find(item=>item.username.toLowerCase() === username.toLowerCase())
    if (!findUser) {
        res.json({status: false, message: 'Invalid username or password'})
        return
    }
    const status = bcrypt.compareSync(password, findUser.password)
    if (!status) {
        res.json({status: false, message: 'Invalid username or password'})
        return
    }
    if(findUserInfo){
        res.json({status: true, username, details: findUserInfo, message: 'Login successful'})
        return
    }
    res.json({status: true, username, details: {}, message: 'Login successful'})
}

const createLogin = (req, res) => {
    const file_name = 'adminlogindb.js'
    const {username, password} = req.body
    const hash = bcrypt.hashSync(password, 10)
    try{

        const loginDb = readJsonFile(file_name)
        const findUser = loginDb.find(item=>item.username.toLowerCase() === username.toLowerCase())
        if (findUser) {
            res.json({status: false, message: 'Username already exists'})
            return
        }
        const data = [...loginDb, {username, password: hash, admin: true}]
        const status = writeJsonFile(file_name, data)
        if (status) {
            res.json({status: true, message: 'Account created successfully'})
        } else {
            res.json({status: false, message: 'Failed to create account'})
        }
    }catch(err){
        res.json({status: false, message: err.message})
    }
}


module.exports = {
    createLogin,
    Login
}