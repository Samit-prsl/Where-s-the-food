const store = require('../controllers/Store');
const order = require('../controllers/Order');
const user = require("../controllers/User");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); 

router.post('/register', user.registerFunc);
router.post('/login', user.loginFunc);

router.post('/store', auth, store.createStoreFunc);
router.get('/stores', auth, store.getStoreData);
router.get('/store/:id', auth, store.getSingleStoreData);
router.get('/storenames', auth, store.getStoreNames);
router.put('/store/:id', auth, store.updateStore);
router.delete('/store/:id', auth, store.deletestore);

router.post('/order', auth, order.createOrder);
router.get('/orders',auth, order.getOrders);
router.get('/order/:id', auth, order.getOrderById);
router.put('/order/:id', auth, order.updateOrder);
router.delete('/order/:id', auth, order.deleteOrder);

module.exports = router;
