/**
 * @param {string} event_name
 * @param {Object} event_data
 * 
 * @returns {Object}
 */
function prepareSQSMessage(event_name, event_data = null) {
    return {
        Message: JSON.stringify({
            event_name: event_name,
            event_data: event_data
        })
    }
}

module.exports = prepareSQSMessage
