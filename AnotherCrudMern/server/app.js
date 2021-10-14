const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
const app = express ()


const routes = require('./router/router')

const PORT = 5000
// conection with mongodb
const MurI ="mongodb+srv://sujan:sujan@annothercrud.hxgjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true }
mongoose.connect(MurI,{connectionParams}).then(()=>console.log("connection success with mongodb"))

// middleware
app.use(express.json())
app.use(express.urlencoded(true))
app.use(cors())

app.use('/api',routes)

app.listen(PORT,()=>{
    console.log("your application is running on port",PORT)
})