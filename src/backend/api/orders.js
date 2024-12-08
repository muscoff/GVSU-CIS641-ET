const router = require('express').Router()
const {getOrders, processOrders} = require('../res_functions/orders')

router.get('/', getOrders)
router.post('/processing', processOrders)

module.exports = router