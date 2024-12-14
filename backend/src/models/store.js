const mongoose = require('mongoose')

const storeSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type:String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    aggregator : {
        type : [String],
        required : true
    },
    orders : [{
         type : mongoose.Schema.Types.ObjectId,
            ref : "order"
}]
})

const store = mongoose.model('store',storeSchema)
module.exports = store