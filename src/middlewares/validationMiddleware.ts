const yup = require("yup");

const validations = require("../validators/commonValidators");
import {
  getInfoValidationSchema,
  getOrderCreatePayloadSchema,
} from "../validators/createOrderValidator";
class ValidationMiddleware {
  validations: any;
  payload_validation_schema: any;
  application_parameters_validation_schema: any;
  // create: any;

  constructor() {
    this.validations = validations;
    this.validations.addMixins(yup);
    // this.create = this.create.bind(this);
    this.payload_validation_schema = getOrderCreatePayloadSchema(
      this.validations
    );
    this.application_parameters_validation_schema = getInfoValidationSchema(
      this.validations
    );
  }

  async runValidations(validationFunctions: any) {
    let errors: any[] = [];
    let error_message = null;

    for (let validationFunction of validationFunctions) {
      await validationFunction().catch((err: { errors: any; message: any }) => {
        const errBug: any =
          'TypeError: (name || "").toLowerCase is not a function';
        if (String(err) === errBug) return;

        errors = errors.concat(err.errors ? err.errors : [err.message]);
        error_message = "Input validation error(s) occurred";
      });
    }

    if (errors.length === 1) {
      return { error_message: errors[0], errors };
    }

    return { errors, error_message };
  }

  validate = async (req: any, res: any, next: any) => {
    const { payload, action } = req.body;

    if (action !== "CREATE_ORDER") {
      throw new Error("Invalid action");
    }

    const validationResult = await this.runValidations([
      () =>
        this.payload_validation_schema.validate(payload, {
          abortEarly: false,
          context: payload,
        }),
    ]);

    if (validationResult.errors.length > 0) {
      throw new Error(
        JSON.stringify({
          error_message: "INPUT_ERROR_OCCURRED",
          errors: validationResult.errors,
        })
      );
    }

    const { application_parameters } = payload;
    const validationApplicationParametersResult = await this.runValidations([
      () =>
        this.application_parameters_validation_schema.validate(
          application_parameters,
          {
            abortEarly: false,
            context: application_parameters,
          }
        ),
    ]);

    if (validationApplicationParametersResult.errors.length > 0) {
      throw new Error(
        JSON.stringify({
          error_message: "INPUT_ERROR_OCCURRED",
          errors: validationApplicationParametersResult.errors,
        })
      );
    }

    return next();
  };

  // validate = async (req: any, res: any, next: any) => {
  //   const { payload, action } = req.body;

  //   if (action !== "CREATE_ORDER") {
  //     return { error_message: "Invalid action" }
  //   }

  //   const validationResult = await this.runValidations([
  //     () =>
  //       this.payload_validation_schema.validate(payload, {
  //         abortEarly: false,
  //         context: payload,
  //       }),
  //   ]);

  //   const { application_parameters } = payload;
  //   const validationApplicationParametersResult = await this.runValidations([
  //     () =>
  //       this.application_parameters_validation_schema.validate(
  //         application_parameters,
  //         {
  //           abortEarly: false,
  //           context: application_parameters,
  //         }
  //       ),
  //   ]);

  //   if (validationResult.errors.length > 0) {
  //     return {
  //       error_message: "INPUT_ERROR_OCCURRED",
  //       errors: validationResult.errors,
  //     }
  //   }

  //   if (validationApplicationParametersResult.errors.length > 0) {
  //     return {
  //       error_message: "INPUT_ERROR_OCCURRED",
  //       errors: validationApplicationParametersResult.errors,
  //     }
  //   }

  //   return next();
  // };
}

export { ValidationMiddleware };
