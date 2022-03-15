const City = require('../1.models/cityModel');

// Consultas
const getAll = async () => { const r = await City.find(); return r; };
const getById = async (id) => { const r = await City.findById(id); return r; };
const getOnes = async (criterio) => { const r = await City.find(criterio); return r; };

const save = async (body) => {
    let {
        name, country, phrase, img,
    } = body;

    name = name.trim().toUpperCase();
    country = country.trim().toUpperCase();

    const city = new City({
        key: `${name}-${country}`,
        name,
        country,
        phrase,
        img,
    });

    await city.save();
    return city;
};

const update = async (body) => {
    const {
        id, name, country, img,
    } = body;

    const city = City.findById(id);

    city.name = name;
    city.country = country;
    city.img = img;

    await city.update();
    return city;
};

module.exports = {
    getAll, getById, getOnes, save, update,
};
