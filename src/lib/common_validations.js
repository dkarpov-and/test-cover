const isUUID = require('is-uuid')
const moment = require('moment-timezone')

/**
 * Common YUP validations we use in controllers
 */
exports.isUUID = {
    name: 'is-uuid',
    message: '${path} is not valid: ${value}',
    test: (value) => value ? isUUID.anyNonNil(value) : true
}

/**
 * Checks that string is in base64 format
 */
exports.isBase64String = {
    name: 'is-base64-string',
    message: 'Not a valid base64 string value',
    test: function (value) {
        if (!value) return true

        const base64regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/

        return base64regex.test(value.trim())
    }
}


/**
 * Checks that provided value is a future date
 */
const ISO_8601 = /^((?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)$/

exports.ISO8601 = {
    name: 'is-valid-date',
    message: '${path} must be in ISO 8601 format (YYYY-MM-DDThh:mm:ss[.mmm]Z)',
    test: function (value) {
        if (!value) return true
        return ISO_8601.test(value)
    }
}

/**
 * Checks that provided value is a Date
 */
exports.isValidDate = {
    name: 'is-valid-date',
    message: '${path} is not a valid date',
    test: function (value) {
        // if value is not provided - don't reject
        // because that is responsibility of .required() validator
        // and this date may be optional
        if (!value) return true
        const matches = value.match(/^\d{4}-\d{2}-\d{2}$/)
        return matches && moment(value).isValid()
    }
}

/**
 * Checks that provided value is a past date
 */
exports.isPastDate = (options = { allow_today: true }) => ({
    name: 'is-past-date',
    message: '${path} must be in past',
    test: function (value) {
        // if value is not provided - don't reject
        // because that is responsibility of .required() validator
        if (!value) return true

        if (!exports.isValidDate.test(value)) {
            return false
        }
        
        const start_of_today = moment.tz(new Date()).startOf('day')
        const start_of_that_day = moment.tz(value).startOf('day')
        if (options.allow_today) {
            return start_of_that_day <= start_of_today
        } else {
            return start_of_that_day < start_of_today
        }
    }
})

/**
 * Function to add our custom validations to yup
 * @param yup
 */
exports.addMixins = (yup) => {

    /**
     * Add yup method 'mutuallyExclusive'
     * which checks that only one of two fields is provided
     */
    yup.addMethod(yup.object, 'mutuallyExclusive', function (key1, key2) {
        return this.test({
            name: 'mutuallyExclusive',
            message: `Please provide either ${key1} or ${key2}, not both`,
            exclusive: true,
            params: { key1, key2 },
            test: value => {
                if (!value) return true
                if (value[key1] && value[key2]) return false
                return true
            }
        })
    })

    /**
     * Method which checks that no unknown keys have been passed
     * Returns error "Unsupported parameter: xxxx"
     */
    yup.addMethod(yup.object, 'noUnknownKeys', function () {
        return this.test('no-unknown', "you can't have unknown keys", function (value) {
            if (!value) return true

            let known = Object.keys(this.schema.fields)
            let unknownKeys = Object.keys(value).filter(key => !known.includes(key))

            if (unknownKeys.length > 0) {
                return Promise.reject(new Error('Unsupported parameter: ' + unknownKeys[0]))
            }
            return true
        })
    })
}
