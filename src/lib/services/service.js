'use strict'

const axios = require('axios')
const crypto = require('crypto')

const { InternalError, BadRequestError } = require(`./../errors`)

class Service {
    regexp = /terminal(.)*[Ii]d(.)*:/

    async checkIfFirmsExists(firmId) {
        const firmData = {}
        const { data } = await axios(`https://www.google.com/search?q=+testing+js`, {
            method: "GET",
        })
        const dataType = typeof data
        if (dataType === 'object' && Object.keys(data).length > 0) {
            firmData.firm = data
            firmData.exists = true
        }

        if (dataType === 'string' || Object.keys(data).length === 0) {
            firmData.firm = null
            firmData.exists = false
        }

        return firmData
    }

    getAuthHeaders() {
        const date = new Date().toUTCString()
        const stringToSign = `date: ${date.trim()}`
        try {
            const encodedSignature = crypto.createHmac('sha1', 'api_secret').update(stringToSign).digest('base64')
            const hmacAuth = 'hmac username="' + 'api_username' + '",algorithm="hmac-sha1",headers="date",signature="' + encodedSignature + '"'
            return {
                date,
                Authorization: hmacAuth
            }
        } catch (err) {
            
            throw new InternalError('CRYPTO_FAILED')
        }
    }

    async submitNewOrder(order_object) {
        try {
            
            const { data } = await this.makeRequest({
                method: 'POST',
                url: '/signup',
                data: order_object
            })
            

            return data
        } catch (err) {
            
            if(err.constructor.name === 'InternalError'){
                throw err
            }
            this.handleError(err, 'submitNewOrder');
        }
    }

    /**
     * Get order status from FirstData Api
     *
     * @param {string} id - Order id
     * @returns {Promise<Object>}
     */
    async getOrderStatus(id) {
        try {
            
            const { data } = await this.makeRequest({
                method: 'POST',
                url: '/status',
                data: { orderIds: [id] }
            })
            

            return data
        } catch (err) {
            
            this.handleError(err, 'getOrderStatus');
        }
    }

    async makeRequest(params) {

        const baseParams = {
            baseURL: `https://fake-host.data.com`,
            headers: this.getAuthHeaders(),
        }

        return axios({ ...params, ...baseParams })
    }

    handleError(err, requestType) {

        if (!err.response) {
            throw new InternalError(
                'REQUEST_TIMEOUT',
                {
                    error_code: err.code,
                    error_message: err.message,
                    error_data: null
                }
            )
        }

        const error_status = err.response.status;
        const error_data = err.response.data;
        const error_message = error_data.message;

        if (error_status === 400 && Array.isArray(error_data)) {
            const bad_request_error_message = error_data.map(item => item.errorMessage).join(', ');
            throw new BadRequestError(bad_request_error_message)
        }

        // Here we handle 5xx and other 4xx errors
        throw new InternalError(
            'REQUEST_FAILED',
            {
                error_status,
                error_message,
                error_data
            }
        )
    }
}

module.exports = new Service()
