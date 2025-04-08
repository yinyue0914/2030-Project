const mongoose = require('mongoose');

let connection = null;

async function connectDB() {
  if (!connection) {
    connection = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongo singelton connected');
  }
  return connection;
}

module.exports = connectDB;