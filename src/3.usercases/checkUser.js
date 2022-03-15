const { response } = require('express');
const itineraryRepository = require('../2.repositories/itineraryRepository');
const userRepository = require('../2.repositories/usrRepository');
const Itinerary = require('../1.models/itineraryModel');

const signInls = async (req, res = response) => {
    try {
        return res.status(200).json({
            message: 'Itineraries',
            response: req.user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const checkUser = async (req, res = response) => {
    try {
        const { itinerary } = req.params;
        const itine = await itineraryRepository.findById(itinerary);

        if (!itine) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const { user } = req;
        const liked = itine.usersLike.indexOf(user._id);

        const comments = await itineraryRepository.getComments({
            itinerary: itine._id });
        const userComments = await itineraryRepository.getComments({
            itinerary: itine._id, user: user._id });

        const resu = {
            response: comments,
            arrayOwnerCheck: userComments,
            likedChek: (liked >= 0),
        };

        return res.status(200).json({
            message: 'Itineraries',
            response: resu,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const like = async (req, res = response) => {
    try {
        const { itinerary } = req.params;
        const itine = await itineraryRepository.findById(itinerary);
        const usr = await URLSearchParams

        if (!itine) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const { user } = req;
        const liked = itine.usersLike.indexOf(user._id);
        if (liked === -1) {
            itine.likes += 1;
            itine.usersLike.push(user._id);
        } else {
            itine.likes -= 1;
            itine.usersLike.splice(liked, 1);
        }

        await Itinerary.updateOne(
            { _id: itine._id },
            {
                likes: itine.likes,
                usersLike: itine.usersLike,
            },
        );

        const resu = {
            likesCount: itine.likes,
            liked: (liked === -1),
        };

        return res.status(200).json({
            message: 'Itineraries',
            response: resu,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const comments = async (req, res = response) => {
    try {
        const { itinerary } = req.params;
        const { text } = req.body;
        const { user } = req;

        const itine = await itineraryRepository.findById(itinerary);
        const usr = await userRepository.findById(user._id);

        if (!itine) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const bdy = {
            text,
            itinerary: itine,
            user: usr,
        };

        const comment = await itineraryRepository.newComment(bdy);

        console.log("*********");
        console.log(bdy);
        console.log(comment);

        itine.comments.push(comment);
        await Itinerary.updateOne(
            { _id: itine._id },
            { comments: itine.comments },
        );

        const comments = await itineraryRepository.getComments({ itinerary: itine._id });
        const userComments = await itineraryRepository.getComments({
            itinerary: itine._id, user: user._id });

        console.log("*********");
        console.log(comments);

        const resu = {
            itineraryId: itine._id,
            response: comments,
            arrayOwnerCheck: userComments,
        };

        console.log("*********");
        console.log(resu);

        return res.status(200).json({
            message: 'Itineraries',
            response: resu,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = {
    checkUser, like, signInls, comments,
};
