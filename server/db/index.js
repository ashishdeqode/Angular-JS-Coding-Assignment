/*
 * @file: index.js
 * @description: It Contain db setup.
 * @author: Ashish Prajapati
 */

const mongoose = require('mongoose')
const {DB_AUTH, DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env;
const databaseUrl = DB_AUTH=='true'?`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`:`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Mongose setup with server
mongoose.connect(databaseUrl, {
    'useCreateIndex': true,
    'useNewUrlParser': true,
    'useUnifiedTopology': true,
    'useFindAndModify': false
}).then(() => {
    console.log('mongodb connected.')
}).catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log('Mongoose Database connected!')
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

