const User = require('../1.models/userModel');

const findById = async (id) => { const r = await User.findById(id); return r; };
const getOne = async (mail) => { const r = await User.findOne(mail); return r; };

const save = async (body) => {
    const usr = new User({
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        userPic: body.userPic,
        country: body.country,
    });

    await usr.save();

    return usr;
};

module.exports = { save, getOne, findById };
