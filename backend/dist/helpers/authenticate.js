"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (allowedRoles) => {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).json({ message: 'Necesita iniciar sesión' });
            return;
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET);
            req.userData = { userId: decodedToken.userId, rol: decodedToken.rol };
            if (!allowedRoles.includes(decodedToken.rol)) {
                res.status(403).json({ message: 'Permiso denegado. El rol del usuario no tiene acceso al servicio' });
                return;
            }
            next();
        }
        catch (error) {
            res.status(403).json({ message: 'Permiso denegado' });
        }
    };
};
exports.default = authenticate;
