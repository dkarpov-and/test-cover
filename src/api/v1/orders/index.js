'use strict'

const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const { one } = require('../middleware')
const OrderCreateController = require(`./order_create.controller`)

function router(mainRouter) {

    const ordersRouter = Router()
    const orderCreateController = new OrderCreateController()

    ordersRouter.post('/', one, asyncHandler(orderCreateController.validate), asyncHandler(orderCreateController.create))
    mainRouter.use('/orders', ordersRouter)
}

module.exports.router = router
