import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export function factoryResponseBody(
  statusCode: number,
  body: string | string,
): APIGatewayProxyStructuredResultV2 {
  return { statusCode, body, isBase64Encoded: false };
}

export function respondWith400(
  body: Record<string, any> | string,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(
    400,
    JSON.stringify({ error: true, message: body }),
  );
}
export function respondWith401(
  body: Record<string, any> | string,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(401, JSON.stringify({ isError: true, body }));
}
export function respondWith404(
  body: Record<string, any> | string,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(404, JSON.stringify(body));
}
export function respondWith422(
  body: Record<string, any> | string,
  message: String,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(
    422,
    JSON.stringify({ isError: true, body, message }),
  );
}

export function respondWith500OrOther(
  body: Record<string, any> | string,
  status?: number,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(
    status ?? 500,
    JSON.stringify({ error: true, message: body }),
  );
}

export function respondWith200(
  body: Record<string, any> | string | null,
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(200, JSON.stringify({ error: false, data: body }));
}

export function responseToJSON(response: Record<string, any> | string): string {
  return JSON.stringify(response);
}
