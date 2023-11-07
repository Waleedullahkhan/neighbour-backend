import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { IErrorInterface } from '../interfaces/error.interface';
import {
  respondWith200,
  respondWith401,
  respondWith404,
  respondWith422,
  respondWith500OrOther,
} from '../utils/response';
import { createRequest } from '../utils/request';
import { Request } from '../interfaces/request.interface';
import dbConnect from '../config/mongodb';
import { getUserIDFromJWT } from '../utils/token';

const withHandler = (
  handler: (event: Request, context: Context) => Promise<any>,
) => {
  return async (event: APIGatewayProxyEventV2, context: Context) => {
    try {
      await dbConnect();
      const request = createRequest();
      request.clear();
      request.setParams(event.pathParameters);
      request.setAws(event);

      let userId = getUserIDFromJWT(String(event.headers.authorization));
      request.setUser({ id: userId });

      return respondWith200(await handler(request, context));
    } catch (error) {
      const err = error as IErrorInterface;

      if (err.name === 'NotFoundException') {
        return respondWith404(err.message);
      }

      if (err.name === 'ValidationException') {
        return respondWith422(err.fields, err.message);
      }

      if (err.name === 'UnAuthorizedException') {
        return respondWith401(err);
      }

      return respondWith500OrOther(err.message as string);
    }
  };
};

export default withHandler;
