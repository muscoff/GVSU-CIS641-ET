const router = require('express').Router()
const {Login} = require('../res_functions/login')
const {createUserInfo} = require('../res_functions/userAccount')

router.post('/', Login)
router.post('/create', createUserInfo)

module.exports = router