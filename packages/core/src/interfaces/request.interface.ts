import {
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventV2,
} from 'aws-lambda';

export interface Request {
  body: any;
  params: { [key: string]: string };
  user: User;
  aws: any;
  setBody: (body: any) => void;
  setParams: (params: APIGatewayProxyEventPathParameters | undefined) => void;
  setAws: (event: APIGatewayProxyEventV2) => void;
  setUser: (getUser: User) => void;
  clear: () => void;
}

export interface User {
  id: string;
  // type: string;
}
