/* eslint-disable no-prototype-builtins */
import { ApiResponse, RequestArgs, RequestType } from "@app/core/api/backend";
import {
  ContentType,
  HttpRequest,
  HttpResponse,
  Method,
} from "@services/http/adapters/http-adapter";
import { skuSubApiRequests } from "@services/http/api/sku-sub-options/api-requests";

export type RequestData = {
  args?: RequestArgs;
};

export type RequestConfig<C = any, T = any> = {
  baseURL: string;
  url: string;
  method: Method;
  contentType: ContentType;
  requiresAuth: boolean;
  transformResponse: (
    response: HttpResponse<C>,
    requestData: RequestData
  ) => ApiResponse<T>;
  path?: string[];
  params?: string[];
  data?: string[];
  transformRequest?: (request: HttpRequest) => HttpRequest;
};

type DefaultConfigProperties = Pick<
  RequestConfig,
  "baseURL" | "contentType" | "requiresAuth" | "transformResponse"
>;
type RequiredConfigProperties = Pick<RequestConfig, "url" | "method">;
export type PartialRequestConfig<C = any, T = any> = RequiredConfigProperties &
  Partial<RequestConfig<C, T>>;

type PartialRequestMap = Record<RequestType, PartialRequestConfig>;

export class HttpRequestMap {
  private partialHttpRequestMap: PartialRequestMap;

  constructor() {
    this.partialHttpRequestMap = {
      ...skuSubApiRequests(),
    };
  }

  private getDefaultConfigProperties(): DefaultConfigProperties {
    return {
      baseURL: "http://localhost:8000/",
      contentType: "application/json",
      requiresAuth: false,
      // eslint-disable-next-line @typescript-eslint/ban-types
      transformResponse: (): ApiResponse<{}> => ({}),
    };
  }

  private applyDefaultConfig(config: PartialRequestConfig): RequestConfig {
    return {
      ...this.getDefaultConfigProperties(),
      ...config,
    };
  }

  public find(request: RequestType): RequestConfig {
    if (!this.partialHttpRequestMap.hasOwnProperty(request)) {
      throw Error(`Cannot create request config for type ${request}`);
    }
    return this.applyDefaultConfig(this.partialHttpRequestMap[request]);
  }
}
