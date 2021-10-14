const mongoose = require("mongoose")

const friendSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }

})

const Friends = mongoose.model('Friends',friendSchema)
module.exports = Friends