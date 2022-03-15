const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    activities: [{ name: String, img: String }],
    authorName: { type: String, required: true },
    authorPic: { type: String, required: true },
    price: {
        type: Number, required: true, min: 1, max: 5,
    },
    duration: { type: Number, required: true, min: 1 },
    likes: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    usersLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true },
});

module.exports = mongoose.model('itinerary', itinerarySchema);
