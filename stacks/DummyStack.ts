import { ApiRouteProps, StackContext, use } from 'sst/constructs';
import { APIStack } from './api';
import { API_VERSION, getName } from './utils';

export function DummyStack({ stack }: StackContext) {
  const api = use(APIStack);

  const DUMMYCALL = `GET /${API_VERSION}`;

  const ROUTES: Record<string, ApiRouteProps<'none'>>[] = [
    {
      [DUMMYCALL]: {
        function: {
          functionName: getName('DUMMYCALL'),
          handler: 'packages/functions/src/lambda.handler',
        },
      },
    },
  ];

  ROUTES.forEach(item => {
    api.addRoutes(stack, item);
  });

  stack.addOutputs({
    DUMMYCALL: api.url + ' ' + DUMMYCALL,
  });
}
