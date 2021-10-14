const mongoose = require("mongoose");

const config = require("config");
const db = config.get("MongUrI");

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }; 

const connectDB = async () => {
  try {
    await mongoose.connect(db, connectionParams);
    console.log("Successfuly Connected to database ");
  } catch (error) {
    console.error(`Error on connecting to the database. \n${error}`);
  }
};

module.exports = connectDB
