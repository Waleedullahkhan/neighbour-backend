import { ApiRouteProps, StackContext, use } from 'sst/constructs';
import { APIStack } from './api';
import { API_VERSION, getName } from './utils';

export function userStack({ stack }: StackContext) {
  const api = use(APIStack);

  const CREATE_USER = `POST /${API_VERSION}/user`;
  const UPDATE_USER = `PATCH /${API_VERSION}/user/{id}`;
  const GET_USER = `GET /${API_VERSION}/user/{id}`;

  const ROUTES: Record<string, ApiRouteProps<'none'>>[] = [
    {
      [CREATE_USER]: {
        function: {
          functionName: getName('CREATE_USER'),
          handler: 'packages/functions/src/routes/user.create',
        },
      },
      [UPDATE_USER]: {
        function: {
          functionName: getName('UPDATE_USER'),
          handler: 'packages/functions/src/routes/user.update',
        },
      },
      [GET_USER]: {
        function: {
          functionName: getName('GET_USER'),
          handler: 'packages/functions/src/routes/user.get',
        },
      },
    },
  ];

  ROUTES.forEach(item => {
    api.addRoutes(stack, item);
  });

  stack.addOutputs({
    CREATE_USER: api.url + ' ' + CREATE_USER,
    UPDATE_USER: api.url + ' ' + UPDATE_USER,
    GET_USER: api.url + ' ' + GET_USER,
  });
}
