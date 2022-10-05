'use strict'

const validations = require(`${__basedir}/lib/common_validations`)
const debug = require('debug')('hp-marketplace')

class BaseController {

    constructor() {
        // make common validations available in all controllers
        this.validations = validations
    }

    async runValidations(validationFunctions) {
        let errors = []
        let error_message = null

        for (let validationFunction of validationFunctions) {
            await validationFunction().catch((err) => {
                errors = errors.concat(err.errors ? err.errors : [err.message])
                error_message = "Input validation error(s) occurred"
            })
        }

        if (errors.length === 1) {
            return { error_message: errors[0], errors }
        }

        return { errors, error_message }
    }

}

module.exports = BaseController
