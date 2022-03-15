const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    key: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    phrase: { type: String, default: '' },
    img: { type: String, required: true },
});

module.exports = mongoose.model('city', citySchema);
