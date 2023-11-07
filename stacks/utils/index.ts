// import { ApiAuthorizer } from "@serverless-stack/resources";

import { ApiAuthorizer, ApiRouteProps } from 'sst/constructs';
export const API_VERSION = process.env.API_VERSION;

export function getName(str: string) {
  return `${process.env.APP_NAME}_${str}`;
}

export function isProduction() {
  return process.env.ENVIRONMENT === 'prod';
}

export const AUTH_POOL_SETTING: Record<string, ApiAuthorizer> = {
  pool: {
    type: 'user_pool',
    userPool: {
      region: process.env.REGION,
      id: String(process.env.USER_POOL_ID),
      clientIds: [String(process.env.USER_POOL_CLIENT_ID)],
    },
  },
};
