const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../2.repositories/usrRepository');

const newUser = async (req, res = response) => {
    try {
        const {
            email, password, firstName, lastName, userPic, country,
        } = req.body;

        // Encriptado de clave
        // Ejemplo:
        // clave2022

        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.hash(password, salt);

        const usr = {
            email,
            password: pwd,
            firstName,
            lastName,
            userPic,
            country,
        };

        const nuevo = await UserRepository.save(usr);
        return res.status(200).json(nuevo);
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const usr = await UserRepository.getOne({ email });

        if (!usr) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const pdwValida = await bcrypt.compare(password, usr.password);

        if (pdwValida) {
            const info = {
                id: usr._id,
                email,
                firstName: usr.firstName,
                lastName: usr.lastName,
                userPic: usr.userPic,
                country: usr.country,
            };

            const token = jwt.sign(info, process.env.TOKEN_KEY);
            res.header('auth-token', token);
            res.status(200).json({
                success: true,
                status: 'OK',
                token,
                ...info,
            });
        } else { res.status(401).json({ success: false, status: 'ERROR' }); }
        return res;
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newUser, login };
