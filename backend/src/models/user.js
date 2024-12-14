const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    password :{
        type:String,
        required:true
    },
    role :{
        type:String,
        required:true
    },
    stores : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "store"
        }
    ]
})

const User = mongoose.model('user',userSchema)
module.exports = User