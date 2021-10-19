const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
require('dotenv').config()
const DB = require('./db')
const swaggerUi = require('swagger-ui-express')
const SwaggerJsDocs = require('./swagger')
const path = require('path');
const routes = require('./routes')

// initiate express
const app = express()

// use CORS
app.use(cors());

// use morgan
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api root
app.get('/', async (req, res, next) => {
  res.send('Hello express.')
})

//  All API Routes 
app.use('/api', routes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerJsDocs));

// Run static setup
app.use(express.static(__dirname + '/web'));
app.get('/*', function (req, res) {
  return res.sendFile(path.join(__dirname + '/web'), (err) => { });
});

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

// get port = require( config
const port = process.env.PORT

// listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
