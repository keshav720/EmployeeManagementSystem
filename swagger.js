const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'API documentation for Employee Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/index.js'], // Path to the API routes files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
