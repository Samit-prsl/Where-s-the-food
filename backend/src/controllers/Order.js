const Order = require('../models/order');
const store = require('../models/store');

const createOrder = async (req, res) => {
  const { storename,items, aggregator, netAmount, grossAmount, tax, discounts, eventLog,time } = req.body;
  try {
    const newOrder = new Order({ storename, items, aggregator, netAmount, grossAmount, tax, discounts, eventLog,date : Date.now(),time });
    await newOrder.save();
    const Store = await store.findOne({name:storename})
    if(!Store) res.status(409).json({"error":"no store found!"})
    Store.orders.push(newOrder)
    await Store.save()
    return res.status(201).json({ order: Store.orders });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating order', details: err.message });
  }
};


const getOrders = async (req, res) => {
  try {
    if(req.query.store){
      const storeName = decodeURIComponent(req.query.store)
      const Store = await Order.find({storename:storeName}).lean()
      if(!Store) return res.status(409).json({"error":"no store found!"})
      return res.status(200).json(Store);
    }
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching orders', details: error.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching order', details: error.message });
  }
};


const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        storeID: req.body.storeID,
        items: req.body.items,
        aggregator: req.body.aggregator,
        netAmount: req.body.netAmount,
        grossAmount: req.body.grossAmount,
        tax: req.body.tax,
        discounts: req.body.discounts,
        eventLog: req.body.eventLog
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });

    return res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating order', details: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    return res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting order', details: error.message });
  }
};



module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
