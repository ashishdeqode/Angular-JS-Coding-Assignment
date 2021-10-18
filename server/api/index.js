/*
 * @file: index.js
 * @description: It combine all routers.
 * @author: Ashish Prajapati
 */

const github = require('./v1/github')

// Combine all Routes
module.exports = [
    ...github
]
