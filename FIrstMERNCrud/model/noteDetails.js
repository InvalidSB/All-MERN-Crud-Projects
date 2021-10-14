const mongoose= require('mongoose')
// Schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:String,
    desc:String,
    date:{
        type:String,
        default: Date.now()
    }
})


// model
const noteDetail = mongoose.model('noteDetail',noteSchema)

module.exports =noteDetail