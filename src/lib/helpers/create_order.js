function createOrder(params) {
    const order_object = {
        "firstName": params.first_name,
        "lastName": params.last_name,
        "dateOfBirth": params.dob,
        "nationalId": params.ssn,
        "title": "Owner",
        "percentageOwnership": 100,
        "isPrimary": "Y",
        "taxId": params.ssn,
        "nationalIdType": "SSN"
    }

    return order_object
}

module.exports = createOrder
