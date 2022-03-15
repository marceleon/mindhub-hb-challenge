const { response } = require('express');
const itineraryRepository = require('../2.repositories/itineraryRepository');

const getItineraries = async (req, res = response) => {
    try {
        const { cityId } = req.params;
        const itineraries = await itineraryRepository.getOnes({ cityId });

        if (!itineraries) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Itineraries',
            response: itineraries,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getItineraries };
