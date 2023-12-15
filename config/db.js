const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://bjarnigod:8XZ2BWNlrBBcFK5g@inf656.umaxw93.mongodb.net/?retryWrites=true&w=majority")
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;