import { IOrdersRepository } from "../IOrdersRepositories";
import { Order } from "../../database/models/Order";

class OrdersRepositorySequelize implements IOrdersRepository {
  async exists(title: string): Promise<boolean> {
    const order = await Order.findOne({
      where: {
        title,
      },
    });

    return !!order;
  }

  async create({
    firstName,
    lastName,
    dateOfBirth,
    nationalId,
    title,
    percentageOwnership,
    isPrimary,
    taxId,
    nationalIdType,
  }: any): Promise<any> {
    const order = await Order.create({
      firstName,
      lastName,
      dateOfBirth,
      nationalId,
      title,
      percentageOwnership,
      isPrimary,
      taxId,
      nationalIdType,
    });

    return order;
  }
}

export { OrdersRepositorySequelize };
