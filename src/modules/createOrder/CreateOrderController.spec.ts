import { app } from "../../app";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Create Order Controller", () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

  it("[INTEGRATION 0001] - should be able to create a new order", async () => {
    const body = {
      action: "CREATE_ORDER",
      payload: {
        firm_id: faker.datatype.uuid(),
        application_parameters: {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          dob: "1979-01-11",
          nationalId: "ssn",
          dba_name: "MMISTestHeadnte20211122e",
          ssn: "123456789",
        },
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.random.words(5),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        nationalId: "ssn",
        percentageOwnership: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 1,
        }),
        taxId: "ssn",
        nationalIdType: "SSN",
      },
    };
    const response = await request(app).post("/v1/orders").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("[INTEGRATION 0002] - should not be able to create an existing order", async () => {
    const body = {
      action: "CREATE_ORDER",
      payload: {
        firm_id: faker.datatype.uuid(),
        application_parameters: {},
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.random.words(5),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        nationalId: "ssn",
        percentageOwnership: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 1,
        }),
        taxId: "ssn",
        nationalIdType: "SSN",
      },
    };

    await request(app).post("/v1/orders").send(body);

    const response = await request(app)
      .post("/v1/orders")
      .send({
        firm_id: faker.datatype.uuid(),
        application_parameters: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          dba_name: faker.company.companyName(),
          dob: faker.date.birthdate(),
          ssn: "ssn",
        },
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: body.payload.title,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        nationalId: "ssn",
        percentageOwnership: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 1,
        }),
        taxId: "ssn",
        nationalIdType: "SSN",
      });

    expect(response.status).toBe(400);
  });

  it("[INTEGRATION 0003] - should not be able to create a new order with invalid action", async () => {
    const body = {
      action: "UPDATE_ORDER",
      payload: {
        firm_id: faker.datatype.uuid(),
        application_parameters: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          dba_name: faker.company.companyName(),
          dob: faker.date.birthdate(),
          ssn: "ssn",
        },
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.random.words(5),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        nationalId: "ssn",
        percentageOwnership: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 1,
        }),
        taxId: "ssn",
        nationalIdType: "SSN",
      },
    };
    const response = await request(app).post("/v1/orders").send(body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid action" });
  });

  it("[INTEGRATION 0004] - should be able to create a new order with custom fields", async () => {
    const applicationParams = {
      dba_name: "MMISTestHeadnte20211122e",
      firm_email: "payment_accounts@headnotelaw.com",
      firm_phone: "6509063247",
      firm_address: "1007 Arthur Ave",
      firm_address_city: "San Leandro",
      firm_address_state: "CA",
      firm_address_zip: "94577",
      firm_company_tax_id: "123456789",
      firm_website: "www.headnote.com",
      firm_incorporation_date: "2010-01-01",
      firm_incorporation_year: "2010",
      firm_create_date: "2021-11-21",
      primary_attorney_first_name: "Matt",
      primary_attorney_last_name: "Crampton",
      primary_attorney_dob: "1979-01-11",
      primary_attorney_ssn: "666989898",
      state_of_incorporation: "DE",
      headnote_fbo_routing_number: "config.HP_FBO_ROUTING_NUMBER",
      headnote_fbo_account_number: "config.HP_FBO_ACCOUNT_NUMBER",
      legal_name: "TestName",
      legal_contact_name: "Matt Crampton",
      first_name: "John",
      last_name: "Doe",
      dob: "2010-01-01",
    };

    const body = {
      action: "CREATE_ORDER",
      payload: {
        firm_id: faker.datatype.uuid(),
        application_parameters: applicationParams,
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.random.words(5),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.birthdate(),
        nationalId: "ssn",
        percentageOwnership: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 1,
        }),
        taxId: "ssn",
        nationalIdType: "SSN",
      },
    };
    const response = await request(app).post("/v1/orders").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("[INTEGRATION 0005] - should not be able to create a new order - invalid application params", async () => {
    const body = {
      action: "CREATE_ORDER",
      payload: {
        firm_id: faker.datatype.uuid(),
        application_parameters: {
          first_name: "1",
          last_name: "1",
          dob: "10.10.2000",
          nationalId: "ssn",
          dba_name: "MMISTestHeadnte20211122e",
          ssn: "123456789",
        },
        title: faker.random.words(5),
      },
    };
    const response = await request(app).post("/v1/orders").send(body);

    expect(response.status).toBe(400);
    expect(JSON.stringify(response.body)).toEqual(
      JSON.stringify({
        message:
          '{"error_message":"INPUT_ERROR_OCCURRED","errors":["last_name must be at least 2 characters","last_name must match the following: \\"/^[a-zA-Z]+$/\\"","first_name must be at least 2 characters","first_name must match the following: \\"/^[a-zA-Z]+$/\\"","dob must match the following: \\"/^\\\\d{4}-\\\\d{2}-\\\\d{2}$/\\"","dob must be in past"]}',
      })
    );
  });
});
