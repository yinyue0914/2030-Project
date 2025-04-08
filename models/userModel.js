const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'member', 'guest'],
        default: 'guest'
    }
});
module.exports = mongoose.model('User', userSchema);