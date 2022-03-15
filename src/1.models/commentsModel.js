const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'itinerary' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    text: { type: String, required: true },
});

module.exports = mongoose.model('comment', commentSchema);
