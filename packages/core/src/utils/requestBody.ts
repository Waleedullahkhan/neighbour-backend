import { APIGatewayProxyEventV2, SQSRecord } from 'aws-lambda';

export function getRequestBody<TBody>({
  body,
}: APIGatewayProxyEventV2 | SQSRecord): TBody | null {
  if (body) return JSON.parse(body);
  return null;
}
