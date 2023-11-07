import { SSTConfig } from 'sst';
import { DummyStack } from './stacks/DummyStack';
import { APIStack } from './stacks/api';
import { userStack } from './stacks/userStack';

export default {
  config(_input) {
    return {
      region: 'us-east-1',
      profile: 'neighbours',
      name: 'neighbours-serverless',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      timeout: '30 seconds',
      environment: {
        REGION: String(process.env.REGION),
        API_VERSION: String(process.env.API_VERSION),
        MONGODB_URI: String(process.env.MONGODB_URI),
        USER_POOL_ID: String(process.env.USER_POOL_ID),
        USER_POOL_CLIENT_ID: String(process.env.USER_POOL_CLIENT_ID),
      },
    });

    app.stack(APIStack).stack(DummyStack).stack(userStack);
  },
} satisfies SSTConfig;
