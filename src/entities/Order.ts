class Order {
  firm_id: string;
  application_parameters: any;
  isPrimary: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationalId: string;
  nationalIdType: string;
  percentageOwnership: number;
  taxId: string;

  private constructor({
    firm_id,
    application_parameters,
    firstName,
    lastName,
    dateOfBirth,
    nationalId,
    title,
    percentageOwnership,
    isPrimary,
    taxId,
    nationalIdType,
  }: Order) {
    return Object.assign(this, {
      firm_id,
      application_parameters,
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
  }

  static create({
    firm_id,
    application_parameters,
    firstName,
    lastName,
    dateOfBirth,
    nationalId,
    title,
    percentageOwnership,
    isPrimary,
    taxId,
    nationalIdType,
  }: Order) {
    const order = new Order({
      firm_id,
      application_parameters,
      firstName,
      lastName,
      dateOfBirth,
      nationalId,
      title,
      percentageOwnership: 100,
      isPrimary,
      taxId,
      nationalIdType: "SSN",
    });
    return order;
  }
}

export { Order };
