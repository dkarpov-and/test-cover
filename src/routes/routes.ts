import { Router } from "express";
const asyncHandler = require("express-async-handler");
import { createOrderFactory } from "../modules/createOrder/CreateOrderFactory";
import { dbInit } from "../database/init";

import { ValidationMiddleware } from "../middlewares/validationMiddleware";

dbInit();

const validator = new ValidationMiddleware();
const routes = Router();

routes.get("/v1", (request, response) => response.send("DB WORKING - v1"));
routes.post(
  "/v1/orders",
  asyncHandler(validator.validate),
  (request, response) => createOrderFactory().handle(request, response)
);

export { routes };
