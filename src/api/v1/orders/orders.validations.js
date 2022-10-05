'use strict'

const yup = require('yup')

const getOrderCreatePayloadSchema = (validations) => yup.object().shape({
    firm_id: yup
        .string()
        .required()
        .test(validations.isUUID)
        .lowercase(),
    application_parameters: yup
        .object()
        .required()
})

const getInfoValidationSchema = (validations) => yup.object().shape({
    last_name: yup
        .string()
        .required()
        .min(2)
        .max(24)
        .matches(/^[a-zA-Z]+$/),
    first_name: yup
        .string()
        .required()
        .min(2)
        .max(24)
        .matches(/^[a-zA-Z]+$/),
    dba_name: yup
        .string()
        .required()
        .min(2)
        .max(24)
        .matches(/^[a-zA-Z0-9\x00-\x5A\x61-\x7B',}~\\]*$/),
    dob: yup
        .string()
        .required()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .test(validations.isPastDate({ allow_today: true })),
    ssn: yup
        .string()
        .trim()
        .required()
        .test('is-valid-ssn', `primary_attorney_ssn must match the following: \"/^[0-9]{9}$/\"`, val => /^[0-9]{9}$/.test(val))
        .test('is-valid-length', 'primary_attorney_ssn must be exactly 9 digits', val => String(val).length === 9),
})

module.exports = {
    OrderInfoValidationSchema: getInfoValidationSchema,
    OrderCreatePayloadSchema: getOrderCreatePayloadSchema,
}
