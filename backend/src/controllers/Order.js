const Order = require('../models/order');

const createOrder = async (req, res) => {
  const { items, aggregator, netAmount, grossAmount, tax, discounts, eventLog,time } = req.body;
  const {storeId} = req.params
  try {
    const newOrder = new Order({ storeId, items, aggregator, netAmount, grossAmount, tax, discounts, eventLog,date : Date.now(),time });
    await newOrder.save();
    return res.status(201).json({ order: newOrder });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating order', details: err.message });
  }
};


const getOrders = async (req, res) => {
  try {
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
