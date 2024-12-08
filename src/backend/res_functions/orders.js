const {readJsonFile, writeJsonFile} = require('../config/logFunc')

const file_path = 'cart.json'
const getOrders = (req, res) => {
    const {user, admin} = req.query
    const cartDB = readJsonFile(file_path)
    if(user){
        const findUserCart = cartDB.filter(c=>c.user === user)
        if(findUserCart.length === 0) return res.json({status: true, processedCart: [], unprocessedCart: []})

        const unprocessedCart = []
        const processedCart = []

        findUserCart.forEach(c=>{
            const pc = c.cart.filter(el=>el.processed === true)
            const upc = c.cart.filter(el=>el.processed === false)
            const pcItem = {date: c.date, cart: pc}
            const upcItem = {date: c.date, cart: upc}

            if(pc.length > 0) processedCart.push(pcItem)
            if(upc.length > 0) unprocessedCart.push(upcItem)
        })
        res.json({status: true, processedCart, unprocessedCart})
    }else{
        const findAdminCart = cartDB.filter(c=>c.admins.includes(admin))

        if(findAdminCart.length === 0) return res.json({status: true, processedCart: [], unprocessedCart: []})

        const unprocessedCart = []
        const processedCart = []

        findAdminCart.forEach(c=>{
            const pc = c.cart.filter(el=>el.processed === true)
            const upc = c.cart.filter(el=>el.processed === false)
            
            if(pc.length > 0) {
                pc.map(item=>{
                    item['user'] = c.user
                    return item
                })
                const pcItem = {date: c.date, cart: pc, user: c.user, details: c.details}
                processedCart.push(pcItem)
            }

            if(upc.length > 0) {
                upc.map(item=>{
                    item['user'] = c.user
                    return item
                })
                const upcItem = {date: c.date, cart: upc, user: c.user, details: c.details}
                unprocessedCart.push(upcItem)
            }
        })

        res.json({status: true, processedCart, unprocessedCart})
    }
}

const processOrders = (req, res) => {
    const {date, ids, admin} = req.body
    
    const cartDB = readJsonFile(file_path)
    if(cartDB.length === 0) return res.json({status: false, message: 'No data to process'})
    
    ids.forEach(({id, user})=>{
        cartDB.map(item=>{
            if(item.date === date && item.user === user){
                item.cart.map(el=>{
                    if(el.id === id){
                        el.processed = true
                    }
                    return el
                })
            }
            return item
        })
    })
    const status = writeJsonFile(file_path, cartDB)
    if(status){
        res.json({status: status})
    }else{
        res.json({status: status, message: 'Error occurred while'})
    }
}

module.exports = {
    getOrders,
    processOrders
}