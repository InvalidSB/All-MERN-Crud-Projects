const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 8080
const connectDB = require('./config/db')
const  routes =require('./routes/post') 
const bodyParser= require("body-parser")

// connection with mongodb
connectDB()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors())
app.use('/api',routes)








app.listen(PORT,()=>{
    console.log("your app is running on ",PORT,"Port")
})