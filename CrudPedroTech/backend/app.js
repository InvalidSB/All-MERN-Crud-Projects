const express = require("express")
const mongoose = require('mongoose')
const routes = require('./router/router')

const PORT =8000
const cors = require('cors')
const app= express()
// connection with mongodb
const MongoUri = "mongodb+srv://sujan:sujan@crudapp.fkxjy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(MongoUri,{useFindAndModify:true, useUnifiedTopology: true ,useNewUrlParser:true}).then(()=>{
    console.log("Successfully Connected to DataBase")
}).catch(()=>{
    console.log("Some problem Arrieved")
})

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use('/api',routes)

// port
app.listen(PORT,()=>{
    console.log("Your app is runnig on port ",PORT)
})
