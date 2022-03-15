const { response } = require('express');
const cityRepository = require('../2.repositories/cityRepsitory');

const getCities = async (req, res = response) => {
    try {
        const cities = await cityRepository.getAll();

        if (!cities) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Cities',
            response: cities,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const findCities = async (req, res = response) => {
    try {
        const { city } = req.params;
        const cities = await cityRepository.getOnes({name: city.trim().toUpperCase() });

        if (!cities) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Cities',
            response: cities,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getCities, findCities };
