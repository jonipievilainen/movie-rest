const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'API for managing movies'
    }
  },
  apis: ['index.js'] // Tiedosto, jossa Express-reitit on määritelty
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
