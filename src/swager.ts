import swaggerJsdoc from 'swagger-jsdoc';

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

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;