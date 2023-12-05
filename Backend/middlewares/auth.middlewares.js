const debug = require("debug")("app:auth-middleware");
const { verifyToken } = require("../utils/jwt.tools");
const User = require("../models/user.model");

const ROLES = require("../data/roles.constants.json");

const PREFIX = "Bearer";

const middlewares = {};

middlewares.authentication = async (req, res, next) => {
    try {
        debug("User authentication");
        // verificar la autorización
        const { authorization } = req.headers;
        
        if (!authorization) {
            console.log(token)
            return res.status(401).json({ error: "El usuario no esta autentificados" });
        }

        // verificar valides del token
        const [prefix, token] = authorization.split(" ");

        if (prefix !== PREFIX) {
            return res.status(401).json({ error: "El usuario no esta autentificadoS" });
        }

        if (!token) {
            return res.status(401).json({ error: "El usuario no esta autentificadoz" });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: "El usuario no esta autentificadoZ" });
        }

        const userId = payload["sub"];

        // verificar el usuario
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ error: "El usuario no esta autentificadoc" });
        }

        debug({ user })

        // comparar el token con los registrados
        const isTokenValid = user.tokens.includes(token);
        if (!isTokenValid) {
            return res.status(401).json({ error: "El usuario no esta autentificadoC" });
        }

        // modificar petición
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno en el servidor" });

    }
}

middlewares.authorization = (rolRequired = ROLES.SYSADMIN) => {
    return (req, res, next) => {
        //Se debe pasar por la autentificación
        try {
            const { roles = [] } = req.user;
            const isAuth = roles.includes(rolRequired);
            const isSysadmin = roles.includes(ROLES.SYSADMIN);

            if (!isAuth && !isSysadmin) {
                return res.status(403).json({ error: "Prohibido" });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno en el servidor" });
        }
    }
}

module.exports = middlewares;