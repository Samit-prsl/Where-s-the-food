const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  storename : {
    type:String,
    required:true
  },
  items: {
    type: [String],
    required: true
  },
  aggregator: {
    type: String,
    required: true
  },
  netAmount: {
    type: String,
    required: true
  },
  grossAmount: {
    type: String,
    required: true
  },
  tax: {
    type: String,
    required: true
  },
  discounts: {
    type: String,
    required: true
  },
  eventLog: {
    type: String, 
  },
  date : {
    type:Date
  },
  time : {
    type : String
  }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
