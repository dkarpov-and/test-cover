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

  it("should be able to create a new order", async () => {
    const orderData: Order = {
      isPrimary: "true",
      title: "testtitle",
      firstName: "testfirstname",
      lastName: "testlastname",
      dateOfBirth: "testdateofbirth",
      nationalId: "testnationalid",
      nationalIdType: "testnationalidtype",
      percentageOwnership: 100,
      taxId: "testtaxid",
    };

    const order = await createOrderService.execute(orderData);

    expect(order).toHaveProperty("id");
    expect(order.title).toBe("testtitle");
  });

  it("should not be able to create an existing order", async () => {
    const orderData: Order = {
      isPrimary: "true",
      title: "test existing title",
      firstName: "test existing firstname",
      lastName: "test existing lastname",
      dateOfBirth: "testdateofbirth",
      nationalId: "testnationalid",
      nationalIdType: "testnationalidtype",
      percentageOwnership: 100,
      taxId: "testtaxid",
    };

    await createOrderService.execute(orderData);

    await expect(createOrderService.execute(orderData)).rejects.toEqual(
      new Error("Order already exists!")
    );
  });
});
