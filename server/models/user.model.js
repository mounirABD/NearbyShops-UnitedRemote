const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{type: String, required:false},
    email:{type: String, required:true, unique:true,
    //regex to validate email
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    password:{type: String, required: true},
    createdAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model('User',UserSchema);