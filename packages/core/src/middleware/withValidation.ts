import { ValidationException } from '../utils/errors/exceptions/ValidationException';
import { getRequestBody } from '../utils/requestBody';
import { ZodSchema, z } from 'zod';
import { BODY_NOT_FOUND } from '../utils/enums/error.enum';
import { createRequest } from '../utils/request';
import { Request } from '../interfaces/request.interface';
import { CustomValidationError } from '../utils/errors/customError';

export const withValidation = (schema: ZodSchema<any>) => {
  return (handler: (event: Request) => Promise<any>) => {
    return async (event: Request) => {
      const request = createRequest();

      const body = getRequestBody<{ data: z.infer<typeof schema> }>(event.aws);

      const validationResult = schema.safeParse(body);
      if (!validationResult.success)
        throw new ValidationException(
          new CustomValidationError(validationResult.error).convertZodError(),
        );

      request.setBody(validationResult.data);

      return handler(event);
    };
  };
};
