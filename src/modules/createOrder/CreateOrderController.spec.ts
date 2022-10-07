import { app } from "../../app";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Create Order Controller", () => {
  it("should be able to create a new order", async () => {
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
    const response = await request(app).post("/v1/orders").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create an existing order", async () => {
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
        application_parameters: {},
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

  it("should not be able to create a new order with invalid action", async () => {
    const body = {
      action: "UPDATE_ORDER",
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
    const response = await request(app).post("/v1/orders").send(body);

    console.log("response.body", response.body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid action" });
  });

  it("should be able to create a new order with custom fields", async () => {
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
});
