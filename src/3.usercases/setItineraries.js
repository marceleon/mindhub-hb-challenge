const { response } = require('express');
const itineraryRepository = require('../2.repositories/itineraryRepository');

const newItinerary = async (req, res = response) => {
    try {
        const itinerary = await itineraryRepository.save(req.body);

        if (!itinerary) {
            return res.status(401).json({
                message: 'Problemas al crear el Itinerario',
            });
        }

        return res.status(200).json({
            message: 'New Itinerary:',
            response: itinerary,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newItinerary };
