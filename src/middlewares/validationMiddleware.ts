class ValidationMiddleware {
  private schema: any;

  constructor(schema: any) {
    this.schema = schema;
  }

  async validate(req: any, res: any, next: any): Promise<any> {
    const body = req.body;
    try {
      await this.schema.validate(body);
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { ValidationMiddleware };
