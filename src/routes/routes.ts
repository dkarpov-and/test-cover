import { Router } from "express";
import { createOrderFactory } from "../modules/createOrder/CreateOrderFactory";
import { dbInit } from "../database/init";

dbInit();

const routes = Router();

routes.get("/v1", (request, response) => response.send("DB WORKING - v1"));
routes.post("/v1/orders", (request, response) =>
  createOrderFactory().handle(request, response)
);

export { routes };
