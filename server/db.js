const mongoose = require('mongoose');

let connection = null;
const URI = process.env.MONGO || 'mongodb://localhost:27017/blogapp';

async function connectDB() {
  if (!connection) {
    connection = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongo(or local) conected');
  }
  return connection;
}

module.exports = connectDB;