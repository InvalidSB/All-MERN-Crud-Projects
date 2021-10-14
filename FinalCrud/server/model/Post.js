const  mongoose  = require("mongoose");



const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:true

    },
    description:{
        type:String,

    },
    postCategory:{
        type:String,
        required:true
    }

})

postModel = mongoose.model('postModel',postSchema)
module.exports= postModel 