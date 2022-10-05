class InternalError extends Error {
    constructor(message, details = {}) {
        super(message)
        this.statusCode = 422
        // these error details are sent back in response metadata
        this.details = {
            message: message,
            ...details
        }
    }
}

module.exports = InternalError
