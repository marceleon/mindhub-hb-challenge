const { Router } = require('express');
const city = require('../4.controller/cityController');

const router = new Router();

router.get('/test', (req, res) => {
    res.send({ msg: 'Test de URL Ciudades' });
});

// Consultas
router.get('/all', city.getCities);
router.get('/:city', city.findCities);

// Actualizaciones
router.post('/', city.newCity);

module.exports = router;
