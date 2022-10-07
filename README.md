### Create Order API

1. Install the dependencies
   `yarn`

2. Start the server
   `yarn dev`

3. Run the tests
   `yarn test`

---

`POST /v1/orders`

Payload:

```
{
    "action": "CREATE_ORDER",
    "payload": {
        "firm_id": "552c3e30-ec11-4f78-bb29-0a6d453671bf",
        "application_parameters": {
            "dba_name": "MMISTestHeadnte20211122e",
            "firm_email": "payment_accounts@headnotelaw.com",
            "firm_phone": "6509063247",
            "firm_address": "1007 Arthur Ave",
            "firm_address_city": "San Leandro",
            "firm_address_state": "CA",
            "firm_address_zip": "94577",
            "firm_company_tax_id": "123456789",
            "firm_website": "www.headnote.com",
            "firm_incorporation_date": "2010-01-01",
            "firm_incorporation_year": "2010",
            "firm_create_date": "2021-11-21",
            "primary_attorney_first_name": "Matt",
            "primary_attorney_last_name": "Crampton",
            "primary_attorney_dob": "1979-01-11",
            "primary_attorney_ssn": "9405738291",
            "state_of_incorporation": "DE",
            "headnote_fbo_routing_number": "config.HP_FBO_ROUTING_NUMBER",
            "headnote_fbo_account_number": "config.HP_FBO_ACCOUNT_NUMBER",
            "legal_name": "TestName",
            "legal_contact_name": "Matt Crampton",
            "first_name": "1",
            "last_name": "1"
        },
        "isPrimary": "Y",
        "title": "adadsad1111",
        "firstName": "first_name",
        "lastName": "last_name",
        "dateOfBirth": "dob",
        "nationalId": "ssn",
        "percentageOwnership": 100,
        "taxId": "ssn",
        "nationalIdType": "SSN"
    }
}
```
