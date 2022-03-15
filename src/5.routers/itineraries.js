const { Router } = require('express');
const itinerary = require('../4.controller/itineraryControeller');

const router = new Router();

// Consultas
router.get('/:cityId', itinerary.getItineraries);

// Actualizaciones
router.post('/', itinerary.newItinerary);

module.exports = router;
