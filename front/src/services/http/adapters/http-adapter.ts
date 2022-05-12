import { ApiResponse, RequestType } from "@app/core/api/backend";

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";
export type ContentType =
  | "multipart/form-data"
  | "application/json"
  | "application/x-www-form-urlencoded";
export interface HttpRequest<T = any> {
  url: string;
  method?: Method;
  baseURL?: string;
  headers: any;
  params: any;
  data: any;
  responseType?: ResponseType;
  noop?: RequestType;
  onTransformResponse: (response: HttpResponse) => ApiResponse<T>;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText?: string;
  headers?: any;
  config?: HttpRequest;
  request?: any;
}

export interface HttpAdapter {
  request<T>(config: HttpRequest): Promise<HttpResponse<T>>;
  toString(): string;
}
