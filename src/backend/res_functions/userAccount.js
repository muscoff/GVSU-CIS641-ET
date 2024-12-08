const bcrypt = require('bcrypt')
const {readJsonFile, writeJsonFile} = require('../config/logFunc')

const createUserInfo = (req, res) => {
    const {fullname, phone, email, password} = req.body
    const hash = bcrypt.hashSync(password, 10)
    if(!(fullname && phone && email && password)){
        res.json({status: false, message: 'Please provide all required fields'})
        return
    }

    const file_name = 'userinfodb.js'
    const login_file_name = 'logindb.js'
    try{
        const userInfoDb = readJsonFile(file_name)
        const loginDb = readJsonFile(login_file_name)
        const userDb = [...userInfoDb, {fullname, phone, email}]

        const findUser = loginDb.find(item=>item.username.toLowerCase() === email.toLowerCase())
        if (findUser) {
            res.json({status: false, message: 'Email already exists'})
            return
        }

        const user_login_db = [...loginDb, {username: email, password: hash, admin: false}]
        const db_status = writeJsonFile(login_file_name, user_login_db)
        if(db_status){
            const status = writeJsonFile(file_name, userDb)
            if(status){
                res.json({status: true, message: 'User account created successfully'})
            }else{
                res.json({status: false, message: 'Failed to create user account'})
            }
        }else{
            res.json({status: false, message: 'Failed to create user'})
            return
        }
    }catch(err) {
        res.json({status: false, message: err.message})
    }
}


module.exports = {
    createUserInfo
}