/*
 * @file: index.js
 * @description: It combine all routers.
 * @author: Ashish Prajapati
 */

const github = require('./github')

// Combine all Routes
module.exports = [
    ...github
]
