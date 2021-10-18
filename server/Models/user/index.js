/*
 * @file: index.js
 * @description: It Contain function layer for collection.
 * @author: Ashish Prajapati
 */

const mongoose = require('mongoose')
const dbSchema = require('./db-schema')
const bcrypt = require('bcrypt')

class UserClass {
    static async encryptPassword(password) {
        try {

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            return hashedPassword

        } catch (error) {
            console.log('Error!');
            throw error
        }
    }

    static async isValidPassword(dbPassword, password) {
        try {

            return await bcrypt.compare(password, dbPassword)

        } catch (error) {
            console.log('Error!');
            throw error
        }
    }
}

dbSchema.loadClass(UserClass);

module.exports = mongoose.model('user', dbSchema);