const { response } = require('express');
const cityRepository = require('../2.repositories/cityRepsitory');

const newCity = async (req, res = response) => {
    try {
        const city = await cityRepository.save(req.body);

        if (!city) {
            return res.status(401).json({
                message: 'Problemas al crear al Cliente',
            });
        }

        return res.status(200).json({
            message: 'New City:',
            response: city,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newCity };
