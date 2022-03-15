const { Router } = require('express');
const user = require('../4.controller/userController');

const router = new Router();

// Consultas
router.get('/checkuser/:itinerary', user.checkUser);
router.get('/like/:itinerary', user.like);
router.get('/signinls', user.signInls);
router.post('/comments/:itinerary', user.comments);

module.exports = router;
