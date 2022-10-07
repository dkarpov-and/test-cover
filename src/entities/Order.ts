class Order {
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
