const Itinerary = require('../1.models/itineraryModel');
const Comment = require('../1.models/commentsModel');

// Consultas
const findById = async (id) => { const r = await Itinerary.findById(id); return r; };
const getOnes = async (criterio) => { const r = await Itinerary.find(criterio); return r; };
const getComments = async (criterio) => { const r = await Comment.find(criterio); return r; };

const save = async (body) => {
    const itinerary = new Itinerary({
        title: body.title,
        img: body.img,
        activities: body.activities,
        authorName: body.authorName,
        authorPic: body.authorPic,
        price: body.price,
        duration: body.duration,
        cityId: body.cityId,
    });

    await itinerary.save();
    return itinerary;
};

const newComment = async (body) => {
    const comment = new Comment({
        text: body.text,
        itinerary: body.itinerary,
        user: body.user,
    });

    await comment.save();
    return comment;
};

module.exports = {
    findById, getOnes, save, newComment, getComments,
};
