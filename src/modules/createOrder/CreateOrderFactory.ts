import { OrdersRepositorySequelize } from "../../repositories/sequelize/OrdersRepositorySequelize";
import { CreateOrderController } from "./CreateOrderController";
import { CreateOrderService } from "./CreateOrderService";

export const createOrderFactory = () => {
  const ordersRepository = new OrdersRepositorySequelize();
  const createOrder = new CreateOrderService(ordersRepository);
  const createOrderController = new CreateOrderController(createOrder);
  return createOrderController;
};
