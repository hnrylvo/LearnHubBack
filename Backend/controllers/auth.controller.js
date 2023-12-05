const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');
const ROLES = require('../data/roles.constants.json');
const { createToken, verifyToken } = require('./../utils/jwt.tools');

const controller = {};

controller.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (user) {
            return res.status(409).json({ error: 'El usuario ya existe' });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
            roles: [ROLES.USER],
        });

        await newUser.save();
        return res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

controller.login = async (req, res, next) => {
    try {
        // Validation
        await body('identifier')
            .isLength({ max: 280 })
            .withMessage('El comentario máximo es de 280 caracteres')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.comparePassword(password)) {
            return res.status(401).json({ error: 'La contraseña es incorrecta' });
        }

        const token = await createToken(user._id);

        let _tokens = [...user.tokens];
        const _verifyPromises = _tokens.map(async (_t) => {
            const status = await verifyToken(_t);
            return status ? _t : null;
        });

        _tokens = (await Promise.all(_verifyPromises))
            .filter((_t) => _t)
            .slice(0, 4);

        _tokens = [token, ..._tokens];
        user.tokens = _tokens;

        await user.save();

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = controller;
