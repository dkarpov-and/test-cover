import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../config/config";

interface OrderAttributes {
  id: number;
  firm_id: string;
  application_parameters: any;
  isPrimary?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationalId?: string;
  nationalIdType?: string;
  percentageOwnership?: number;
  taxId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface OrderInput extends Optional<OrderAttributes, "id"> {}
export interface OrderOuput extends Required<OrderAttributes> {}

class Order
  extends Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  public id!: number;
  public firm_id!: string;
  public application_parameters!: any;
  public isPrimary!: string;
  public title!: string;
  public firstName!: string;
  public lastName!: string;
  public dateOfBirth!: string;
  public nationalId!: string;
  public nationalIdType!: string;
  public percentageOwnership!: number;
  public taxId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firm_id: {
      type: DataTypes.STRING,
    },
    application_parameters: {
      type: DataTypes.JSON,
    },
    isPrimary: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    nationalId: {
      type: DataTypes.STRING,
    },
    nationalIdType: {
      type: DataTypes.STRING,
    },
    percentageOwnership: {
      type: DataTypes.INTEGER,
    },
    taxId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export { Order };
