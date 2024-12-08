const router = require('express').Router()
const {Login} = require('../res_functions/adminlogin')
const {createAdminInfo} = require('../res_functions/adminAccount')

router.post('/', Login)
router.post('/create', createAdminInfo)

module.exports = router