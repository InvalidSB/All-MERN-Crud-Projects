const mongoose = require('mongoose')

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    address:{
       type:String,
       default:"Kathmandu"
    },
    phone:{
        type:Number,
        required:true,
    },
    qlty:{
        type:String
    }

})

const StudentModel = mongoose.model('Student',StudentSchema)

module.exports = StudentModel