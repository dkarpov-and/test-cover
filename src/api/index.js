'use strict'

const { Router } = require('express')

function router(app) {

    const { router: ordersRouter } = require('./v1/orders')
    const mainRouter = Router()

    ordersRouter(mainRouter)

    app.use("/v1", mainRouter)
}

module.exports.router = router
