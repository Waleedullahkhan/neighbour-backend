import { StackContext, Api } from 'sst/constructs';
import { AUTH_POOL_SETTING, isProduction } from '../utils';

export function APIStack({ stack }: StackContext) {
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'pool',
      function: {
        runtime: 'nodejs18.x',
        timeout: '30 seconds',
      },
    },
    authorizers: AUTH_POOL_SETTING,
    accessLog: {
      retention: isProduction() ? 'one_month' : 'one_week',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
