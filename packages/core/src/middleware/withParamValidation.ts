import { isValidObjectId } from 'mongoose';
import { Request } from '../interfaces/request.interface';
import { NOT_FOUND } from '../utils/enums/error.enum';
import { NotFoundException } from '../utils/errors/exceptions';

export function withParamValidation(params?: Array<string>) {
  return (handler: (request: Request) => Promise<any>) => {
    return async (request: Request) => {
      const id = request.params.id;

      if (!id || !isValidObjectId(id)) throw new NotFoundException(NOT_FOUND);

      return handler(request);
    };
  };
}
