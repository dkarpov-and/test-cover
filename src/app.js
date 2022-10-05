'use strict'

// Experimental: normalizing all include paths
global.__basedir = __dirname

const express = require('express')
const debug = require('debug')('hp-marketplace')


const { json } = require('body-parser')
const { router } = require(`${__basedir}/api`)

const app = express()

app.use(json({ limit: '50mb' }))

app.use(async function (req, res, next) {

    // log all requests

    debug(`Request: ${req.method} ${req.originalUrl}`)

    if (req.method == "POST") {
        debug(JSON.stringify(req.body))
    }

    next()

})

// Main router for entire application
router(app)

// Route not found (404)
app.use(async function (req, res) {

    return res.status(404).send({
        "_metadata": {
            "success_flag": false,
            "error_message": 'Route ' + req.url + ' not found.'
        },
        "data": []
    })

})

// 500 - Any server error
// Don't delete "next" here it's important to have 4 params
/* eslint-disable-next-line no-unused-vars */
app.use(async function (err, req, res, next) {

    if (err.http_status && err.http_status < 500) {
        return res.status(err.http_status).send({
            "_metadata": {
                "success_flag": false,
                "error_message": err.message
            },
            "data": null
        })
    }

    return res.status(500).send({
        "_metadata": {
            "success_flag": false,
            "error_message": err.message
        },
        "data": null
    })

})

module.exports = app

