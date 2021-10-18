/*
 * @file: search.js
 * @description: It contain current file route/api.
 * @author: Ashish Prajapati
 */

const express = require('express')
const { searchUser } = require('../../../Controllers/Github.Controller')
const Joi = require('@hapi/joi')
const createError = require('http-errors')

const app = express()

/**
 * @swagger
 * /api/v1/github/search_user:
 *  get:
 *   tags: ["Github"]
 *   summary: Github Search API
 *   description: api used to Search github
 *   parameters:
 *      - in: query
 *        name: user
 *        required: true
 *      - in: query
 *        name: page
 *        required: true
 *      - in: query
 *        name: limit
 *        required: true
 *   responses:
 *    '200':
 *      description: success
 *    '400':
 *      description: fail
 */

const githubSchema = Joi.object({
    user: Joi.string()    
        .label('Repo')
});

const validateData = async (req, res, next) => {
    await githubSchema.validateAsync(req.body)
        .then(() => {
            // do nothing
            next()
        }).catch(err => {
            return next(createError.BadRequest(err.details[0].message))
        })
}

app.get(
    '/github/search_user',
    validateData,
    searchUser
);

module.exports = app;

