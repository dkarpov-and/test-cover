import { Order } from "../entities/Order";

interface IOrdersRepository {
  create(order: Order): Promise<Order>;
  exists(title: string): Promise<boolean>;
}

export { IOrdersRepository };
