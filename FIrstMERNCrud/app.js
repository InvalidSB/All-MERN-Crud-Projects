const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
// const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 8080
const app= express()
const routes= require('./route/apis')

// connection with mongodb\
const mongoUri = 'mongodb+srv://chor123:csnF3hPCOSBNxeh6@cluster0.qw58n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(mongoUri,connectionParams)
.then( () => {
    console.log('Successfuly Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
// app.use(bodyParser.json())
 
// Body parser use nagarne vaye 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// app.use(cors())
// HTTP logger
app.use(morgan('tiny'));
app.use('/api',routes);
            
            
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`)
})