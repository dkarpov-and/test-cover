import { Order } from "../../entities/Order";
import { IOrdersRepository } from "../../repositories/IOrdersRepositories";

interface IOrderRequest {
  isPrimary: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationalId: string;
  nationalIdType: string;
  percentageOwnership: number;
  taxId: string;
}

class CreateOrderService {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute({
    isPrimary,
    title,
    firstName,
    lastName,
    dateOfBirth,
    nationalId,
    percentageOwnership,
    taxId,
    nationalIdType,
  }: IOrderRequest) {
    const orderAlreadyExists = await this.ordersRepository.exists(title);

    if (orderAlreadyExists) {
      throw new Error("Order already exists!");
    }

    const orderCreate = Order.create({
      isPrimary,
      title,
      firstName,
      lastName,
      dateOfBirth,
      nationalId,
      percentageOwnership,
      taxId,
      nationalIdType,
    });
    const order = await this.ordersRepository.create(orderCreate);

    return order;
  }
}

export { CreateOrderService };
