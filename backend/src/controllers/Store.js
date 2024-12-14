const store = require('../models/store')
const order = require('../models/order')
const bcrypt = require('bcryptjs')
const {getMinutes} = require('../utils/convertToMins')
const User = require('../models/user')
const createStoreFunc = async (req,res) => {
    const {name,username,password,aggregator} = req.body
    try {
        
        const isUser = await store.findOne({username})
        if(isUser)
        return res.status(409).json('Username already exists!')
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({username:req.user.username})
        if(!user) res.status(400).json('Username doesnt exists!')

    
        const newstore = new store({name:name,username:username,password:hashedPassword,aggregator:aggregator})
        await newstore.save()
        user.stores.push(newstore)
        await user.save()
        return res.status(201).json({"store":user.stores})
    } catch (err) {
        return err
    }
}

const getStoreData = async(req,res) =>{
  try {
    const user = await User.findOne({username:req.user.username})
    if(!user) res.status(400).json('Username doesnt exists!')
    const stores = await user.populate('stores')
    const orders = await order.find({ eventLog: 'delivered' }).sort({ date: -1 }).lean();
    
    const data = stores?.stores.map(store => {
        const storeOrders = orders.filter(order => 
            order.storename.toString() === store.name.toString()
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

    return res.json(data); 
} catch (err) {
    return res.status(500).json({ error: 'Error fetching data', details: err.message });
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

  const getStoreNames = async(req,res)=>{
    try {
      const storeName = await User.findOne({username:req.user.username}).populate('stores')
      if(!storeName) return res.status(409).json({ message: "Store names not properly" });
      return res.status(200).json({"stores":storeName.stores})
    } catch (error) {
      return error;
    }
  }

module.exports =  {createStoreFunc,getStoreData,getSingleStoreData,updateStore,deletestore,getStoreNames}