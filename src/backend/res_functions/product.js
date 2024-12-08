const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const {readJsonFile, writeJsonFile} = require('../config/logFunc')

const configRoot = path.parse(__dirname).dir

const getAllProducts = (req, res) => {
    const productDb = readJsonFile('productdb.js')
    const arr = []
    productDb.forEach(item=>{
        const [seller] = Object.keys(item)
        const admin = item[seller]
        const products = item['products'] ?? []
        products.forEach(p=>{
            const p_item = {...p, admin}
            arr.push(p_item)
        })
        // console.log(products)
        // console.log(admin)
    })
    // const keys = Object.keys(productDb)
    // console.log(keys)
    res.json({status: true, data: arr})
}

const getProduct = (req, res) => {
    const { admin } = req.params
    const productDb = readJsonFile('productdb.js')
    const findSeller = productDb.find(s=>s.seller === admin)
    res.json({status: true, data: findSeller?.products ?? []})
}

const getSingleProduct = (req, res) => {
    const {admin, productID} = req.params
    const productDb = readJsonFile('productdb.js')
    const findSeller = productDb.find(s=>s.seller === admin)
    const {products} = findSeller
    const findProduct = !products ? null : products.find(p=>p.id === Number(productID))
    res.json({status: products ? true: false, data: findProduct})
}

const createProduct = (req, res) => {
    const form = new formidable.IncomingForm({multiples: false})

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err)
            return res.status(500).json({status: false, message: 'Error processing form'})
        }

        const {name, price, description, admin} = fields
        const administrator = admin[0]
        const image = files.img[0]
        const {filepath, newFilename, originalFilename} = image
        const ext = path.parse(originalFilename).ext
        const imageName = `${newFilename}${ext}`
        const imageLocation = `http://${req.headers.host}/images/${imageName}`
        const imagePath = path.join(configRoot, 'public', 'images', imageName)
        const state = {
            id: Math.floor(Math.random() * 1000000000),  // Generate a unique ID for the product
            name: name[0], 
            price: price[0], 
            description: description[0],
            img: imageLocation
        }

        try{
            fs.rename(filepath, imagePath, err=>{
                if(err) return res.json({status: false, message: 'Error saving image'})
                // Save the product data to a database or save the image file to disk
                // Example:
                const productDb = readJsonFile('productdb.js')
                const findSeller = productDb.find(s=>s.seller === administrator)
                const prod_arr = findSeller ? [...findSeller['products'], state] : {seller:administrator, products:[state]}
                const final_Db_Products = productDb.length === 0 ? [prod_arr] : productDb.map(item=>{
                    if(item.seller === administrator) item['products'] = prod_arr
                    return item
                })
                const status = writeJsonFile('productdb.js', final_Db_Products)

                if(status){
                    res.json({status: true, message: 'Product created successfully'})
                }else{
                    fs.unlink(imagePath, err=>{
                        if(err) return res.json({status: false, message: 'Failed to remove image file'})
                        return res.json({status: false, message: 'Failed to save product'})
                    })
                }
            })
        }catch(e){
            return res.json({status: false, message: e.message})
        }
    })
}

const editProduct = (req, res) => {
    const form = new formidable.IncomingForm({multiples: false})

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err)
            return res.status(500).json({status: false, message: 'Error processing form'})
        }

        const {id, name, price, description, admin, oldImage} = fields
        const prodId = Number(id[0])
        const administrator = admin[0]
        const old_image = oldImage[0].split('/')
        const old_pic = old_image[old_image.length - 1]
        const image = files.img[0]
        const {filepath, newFilename, originalFilename} = image
        const ext = path.parse(originalFilename).ext
        const imageName = `${newFilename}${ext}`
        const imageLocation = `http://${req.headers.host}/images/${imageName}`
        const imagePath = path.join(configRoot, 'public', 'images', imageName)
        const oldImagePath = path.join(configRoot, 'public', 'images', old_pic)
        const state = {
            id: prodId,  // Generate a unique ID for the product
            name: name[0], 
            price: price[0], 
            description: description[0],
            img: imageLocation
        }
        console.log('state', state)

        const productDb = readJsonFile('productdb.js')
        const findSeller = productDb.find(s=>s.seller === administrator)
        const products = findSeller?.products ?? []

        const prodMap = products.map(prod=>{
            if(prod.id === prodId) return state
            return prod
        })

        const prodDBMap = productDb.map(pa=>{
            if(pa.seller === administrator) pa.products = prodMap
            return pa
        })

        try{
            fs.rename(filepath, imagePath, err=>{
                if(err) return res.json({status: false, message: 'Error saving image'})
                // Save the product data to a database or save the image file to disk
                // Example:
                const status = writeJsonFile('productdb.js', prodDBMap)

                if(status){
                    fs.unlink(oldImagePath, err=>{
                        if(err) return res.json({status: true, message: 'Product updated but failed to remove old image file'})
                        return res.json({status: true, message: 'Product updated successfully'})
                    })
                }else{
                    fs.unlink(imagePath, err=>{
                        if(err) return res.json({status: false, message: 'Failed to remove image file'})
                        return res.json({status: false, message: 'Failed to update product'})
                    })
                }
            })
        }catch(e){
            return res.json({status: false, message: e.message})
        }
    })
}

const editProductContent = (req, res) => {
    const {id, admin, name, price, description, img} = req.body
    const product = {id, name, price, description, img}
    const productDb = readJsonFile('productdb.js')
    const findSeller = productDb.find(s=>s.seller === admin)
    const products = findSeller?.products ?? []
    
    const prodMap = products.map(prod=>{
        if(prod.id === id) return product
        return prod
    })
    const prodDBMap = productDb.map(pa=>{
        if(pa.seller === admin) pa.products = prodMap
        return pa
    })
    const status = writeJsonFile('productdb.js', prodDBMap)
    if(status){
        res.json({status: true, message: 'Product updated successfully'})
    }else{
        res.json({status: false, message: 'Failed to update product'})
    }
}

module.exports = {
    createProduct,
    getProduct,
    getSingleProduct,
    getAllProducts,
    editProduct,
    editProductContent
}