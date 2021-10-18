/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Ashish Prajapati
 */
const swaggerJsDocs = require('swagger-jsdoc');
const { HOST, PORT } = process.env;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Github Search API Docs',
            version: '1.0',
            description: 'All api end points',
            contact: {
                name: 'Ashish Prajapati'
            },
            servers: [HOST + ':' + PORT]
        },
        produces: ['application/json'],
        Headers: ['Access-Control-Allow-Headers'],
        host: HOST + ':' + PORT
    },
    apis: process.env.NODE_ENV === 'live' ? ['*/*/*/*/*.js'] : ['./api/v1/*/*.js'],
    layout: 'AugmentingLayout'
};
module.exports = swaggerJsDocs(swaggerOptions);

