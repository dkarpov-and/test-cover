import { Order } from "../../entities/Order";
import { IOrdersRepository } from "../IOrdersRepositories";
import { v4 as uuid } from "uuid";

class OrdersRepositoryInMemory implements IOrdersRepository {
  private orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    Object.assign(order, {
      id: uuid(),
    });

    this.orders.push(order);
    return order;
  }

  async exists(title: string): Promise<boolean> {
    const order = this.orders.some((order) => order.title === title);
    return order;
  }
}

export { OrdersRepositoryInMemory };
