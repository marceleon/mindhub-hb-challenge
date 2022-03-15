const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String, unique: true, required: true, lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    firstName: { type: String, required: true, minlength: 5 },
    lastName: { type: String, required: true, minlength: 5 },
    userPic: { type: String, required: true },
    country: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);
