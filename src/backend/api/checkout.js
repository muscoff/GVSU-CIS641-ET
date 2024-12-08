const router = require('express').Router()
const {checkout} = require('../res_functions/checkout')

router.post('/', checkout)

module.exports = router