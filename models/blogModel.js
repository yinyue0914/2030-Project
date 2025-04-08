const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Blog', blogSchema);