import { app } from "../../app";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Create Order Controller", () => {
  it("should be able to create a new order", async () => {
    const body = {
      action: "CREATE_ORDER",
      payload: {
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.lorem.word(5),
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
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.lorem.word(5),
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
        isPrimary: faker.helpers.arrayElement(["Y", "N"]),
        title: faker.lorem.word(5),
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
});
