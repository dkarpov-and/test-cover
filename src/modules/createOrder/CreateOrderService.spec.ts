import { faker } from "@faker-js/faker";

import { Order } from "../../entities/Order";
import { OrdersRepositoryInMemory } from "../../repositories/in-memory/OrdersRepositoryInMemory";
import { IOrdersRepository } from "../../repositories/IOrdersRepositories";
import { CreateOrderService } from "./CreateOrderService";

describe("Create order", () => {
  let ordersRepository: IOrdersRepository;
  let createOrderService: CreateOrderService;

  beforeAll(() => {
    ordersRepository = new OrdersRepositoryInMemory();
    createOrderService = new CreateOrderService(ordersRepository);
  });

  it("[UNIT 0001] - should be able to create a new order", async () => {
    const orderData: Order = {
      firm_id: faker.datatype.uuid(),
      application_parameters: {},
      isPrimary: faker.helpers.arrayElement(["Y", "N"]),
      title: faker.random.words(5),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: String(`faker.date.birthdate()`),
      nationalId: "ssn",
      percentageOwnership: faker.datatype.number({
        min: 10,
        max: 100,
        precision: 1,
      }),
      taxId: "ssn",
      nationalIdType: "SSN",
    };

    const order = await createOrderService.execute(orderData);

    expect(order).toHaveProperty("id");
    expect(order.title).toBe(orderData.title);
  });

  it("[UNIT 0002] - should not be able to create an existing order", async () => {
    const orderData: Order = {
      firm_id: faker.datatype.uuid(),
      application_parameters: {},
      isPrimary: faker.helpers.arrayElement(["Y", "N"]),
      title: "test existing title",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: String(`faker.date.birthdate()`),
      nationalId: "ssn",
      percentageOwnership: faker.datatype.number({
        min: 10,
        max: 100,
        precision: 1,
      }),
      taxId: "ssn",
      nationalIdType: "SSN",
    };

    await createOrderService.execute(orderData);

    await expect(createOrderService.execute(orderData)).rejects.toEqual(
      new Error("Order already exists!")
    );
  });
});
