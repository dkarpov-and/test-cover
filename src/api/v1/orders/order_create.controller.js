'use strict'

const yup = require('yup')
const _ = require('lodash')

const BaseController = require('../base.controller')
const service = require('../../../lib/services/service')
const helpers = require('../../../lib/helpers')

const { OrderCreatePayloadSchema, OrderInfoValidationSchema } = require('./orders.validations')
const { InternalError } = require(`../../../lib/errors`)

class OrderCreateController extends BaseController {
    constructor() {
        super()
        this.validations.addMixins(yup)
        this.create = this.create.bind(this)
        this.payload_validation_schema = OrderCreatePayloadSchema(this.validations)
        this.application_parameters_validation_schema = OrderInfoValidationSchema(this.validations)
    }

    validate = async (req, res, next) => {
        const { payload, action } = req.body

        if (action !== "CREATE_ORDER") {
            return this.badRequest(req, res, { error_message: "Invalid action" })
        }

        const validationResult = await this.runValidations([
            () => this.payload_validation_schema.validate(payload, {
                abortEarly: false,
                context: payload
            })
        ])

        const { application_parameters } = payload
        const validationApplicationParametersResult = await this.runValidations([
            () => this.application_parameters_validation_schema.validate(application_parameters, {
                abortEarly: false,
                context: application_parameters
            })
        ])

        if (validationResult.errors.length > 0) {
            return this.badRequest(req, res, {
                "error_message": 'INPUT_ERROR_OCCURRED',
                "errors": validationResult.errors
            })
        }

        if (validationApplicationParametersResult.errors.length > 0) {
            return this.badRequest(req, res, {
                "error_message": 'INPUT_ERROR_OCCURRED',
                "errors": validationApplicationParametersResult.errors
            })
        }

        return next()
    }

    async create(req, res) {

        try {
            const { payload } = req.body
            const { firm_id, application_parameters } = payload
            
            
            let order_object = null
            let api_response_data = null

            // first = check if we have firm
            let { exists } = await service.checkIfFirmsExists(firm_id)
            
            if (!exists) {
                throw new InternalError('FIRM_NOT_FOUND')
            }

            // Add autoconstructed field
            const firm_incorporation_date = new Date(application_parameters.firm_incorporation_date)
            application_parameters.firm_incorporation_year = firm_incorporation_date.getFullYear().toString()

            // Do not store encryption required fields
            const original_application_parameters = _.omit(application_parameters, ['primary_attorney_ssn', 'firm_company_tax_id'])

            // create Marketplace object
            order_object = helpers.createOrder(application_parameters)
            // submit to Marketplace api
            api_response_data = await service.submitNewOrder(order_object)

            
            if (!api_response_data || !api_response_data.orderId) {
                throw new InternalError('EMPTY_ORDER_ID')
            }
            

            return res.sendData(
                {
                    "_metadata": {
                        "success_flag": true,
                        "error_message": null
                    },
                    "data": api_response_data
                })
        } catch (err) {
            return this.badRequest(req, res, err)
        }
    }

    badRequest(req, res, details) {
        return res.status(403).send({
            "_metadata": {
                "success_flag": false,
                "error_message": details.error_message,
                "error_code": 'OTHER_ERROR',
                "errors": details.errors || []
            },
            "data": res.EMPTY_DATA
        })
    }
}

module.exports = OrderCreateController
