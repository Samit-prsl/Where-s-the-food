const store = require('../models/store')
const order = require('../models/order')
const bcrypt = require('bcryptjs')
const {getMinutes} = require('../utils/convertToMins')
const createStoreFunc = async (req,res) => {
    const {name,username,password,aggregator} = req.body
    try {
        
        const isUser = await store.findOne({username})
        if(isUser)
        return res.status(409).json('Username already exists!')
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newstore = new store({name:name,username:username,password:hashedPassword,aggregator:aggregator})
        await newstore.save()
        return res.status(201).json({"store":newstore})
    } catch (err) {
        return err
    }
}

const getStoreData = async(req,res) =>{
  try {
    const stores = await store.find().lean();
    const orders = await order.find({ eventLog: 'delivered' }).sort({ date: -1 }).lean();

    const data = stores.map(store => {
        const storeOrders = orders.filter(order => 
            order.storeId.toString() === store._id.toString()
        );
        
        const aggregators = store.aggregator.map(agg => {
            const aggregatorOrders = storeOrders
                .filter(order => order.aggregator.trim().toLowerCase() === agg.trim().toLowerCase())
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            const [lastOrder, previousOrder] = aggregatorOrders;
            const timeElapsed = (lastOrder && previousOrder) 
                ? getMinutes(lastOrder.time) - getMinutes(previousOrder.time)
                : null;

            return {
                aggregator: agg,
                timeElapsed,
                time: lastOrder?.time
            };
        });
        
        return { storeName: store.name, aggregators };
    });

    res.json(data);
} catch (err) {
    res.status(500).json({ error: 'Error fetching data', details: err.message });
}
}

const getSingleStoreData = async(req,res) =>{
    try {
        const isUser = await store.findById(req.params.id)
        if(isUser)
        return res.status(200).json(isUser)
    } catch (error) {
        return res.status(409).json("store not found!")
    }
}

const updateStore = async (req, res) => {
    try {
      const isstore = await store.findById(req.params.id);
      if (!isstore) return res.status(404).json({ message: "store not found!" });

      let hashedPassword = ''
      if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      const updatestore = await store.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name || isstore.name,
          username: req.body.username || isstore.username,
          password: hashedPassword || isstore.password,
          aggregator : req.body.aggregator || isstore.aggregator
        },
        { new: true }
      );
  
      updatestore?.save();
      return res
        .status(200)
        .json({ message: "store updated succesfully", Data: updatestore });
    } catch (error) {
      return error;
    }
  };

  const deletestore = async (req, res) => {
    try {
      const isstore = await store.findByIdAndDelete(req.params.id);
      if (!isstore) return res.status(404).json({ message: "Can't delete!" });
      return res
        .status(200)
        .json({ message: "store deleted succesfully", Data: isstore });
    } catch (error) {
      return error;
    }
  };

module.exports =  {createStoreFunc,getStoreData,getSingleStoreData,updateStore,deletestore}