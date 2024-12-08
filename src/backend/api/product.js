const router = require('express').Router()
const { 
    createProduct, getProduct, getSingleProduct, editProduct, 
    editProductContent, getAllProducts 
} = require('../res_functions/product')

router.get('/all', getAllProducts)
router.get('/:admin', getProduct)
router.get('/:admin/:productID', getSingleProduct)
router.post('/add', createProduct)
router.post('/edit', editProduct)
router.post('/edit-content', editProductContent)


module.exports = router