const { newUser, login } = require('../3.usercases/mngUsers');
const {
    checkUser, like, signInls, comments,
} = require('../3.usercases/checkUser');

module.exports = {
    newUser, login, checkUser, like, signInls, comments,
};
