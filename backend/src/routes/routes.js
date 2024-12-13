const store = require('../controllers/Store')
const order = require('../controllers/Order')
const user = require("../controllers/User")
const express = require('express')
const router = express()

router.post('/register',user.registerFunc)
router.post('/login',user.loginFunc)

router.post('/store',store.createStoreFunc)
router.get('/stores',store.getStoreData)
router.get('/store/:id',store.getSingleStoreData)
router.put('/store/:id',store.updateStore)
router.delete('/store/:id',store.deletestore)

router.post('/order/:storeId',order.createOrder)
router.get('/orders',order.getOrders)
router.get('/order/:id',order.getOrderById)
router.put('/order/:id',order.updateOrder)
router.delete('/order/:id',order.deleteOrder)

module.exports = router