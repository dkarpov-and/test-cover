import { Order } from "./models/Order";
const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  Order.sync({ alter: isDev });
};

export { dbInit };
