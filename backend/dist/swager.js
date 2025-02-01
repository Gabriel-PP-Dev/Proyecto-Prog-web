"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
        host: 'localhost:4000',
        basePath: '/',
        apis: ['./src/rutes/*.ts'],
    },
    apis: ['./src/rutes/*.ts'], // ruta a tus archivos de rutas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
