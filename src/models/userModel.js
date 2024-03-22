const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: String,
        email: String,
        password: String,
        userid: Number,
    }
)

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
