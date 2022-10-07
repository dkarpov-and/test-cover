import { Request, Response } from "express";
import { CreateOrderService } from "./CreateOrderService";

class CreateOrderController {
  constructor(private createOrder: CreateOrderService) {}

  async handle(request: Request, response: Response) {
    const {
      payload
    } = request.body;

    const {
      firstName,
      lastName,
      dateOfBirth,
      nationalId,
      title,
      percentageOwnership,
      isPrimary,
      taxId,
      nationalIdType,
    } = payload;

    const order = await this.createOrder.execute({
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

    return response.json(order);
  }
}

export { CreateOrderController };
