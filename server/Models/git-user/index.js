/*
 * @file: index.js
 * @description: It Contain function layer for collection.
 * @author: Ashish Prajapati
 */

const mongoose = require('mongoose')
const dbSchema = require('./db-schema')
const bcrypt = require('bcrypt')

class GitUserClass {

}

dbSchema.loadClass(GitUserClass);

module.exports = mongoose.model('gituser', dbSchema);