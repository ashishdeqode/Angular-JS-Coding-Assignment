/*
 * @file: db-schema.js
 * @description: It Contain db schema.
 * @author: Ashish Prajapati
 */

const mongoose = require('mongoose')
// const momentZone = require('moment-timezone')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = UserSchema
