import {
  ApiClient,
  ApiResponse,
  RequestArgs,
  RequestType,
} from "@app/core/api/backend";
import { Log } from "@domain/logger/log";
import { HttpAdapter } from "@services/http/adapters/http-adapter";
import { HttpRequestConfigFactory } from "@services/http/http-request-factory";
import { AxiosError } from "axios";

export class HttpClient implements ApiClient {
  private TAG = "http-client";

  constructor(
    private logger: Log,
    private httpAdapter: HttpAdapter,
    private httpRequestConfigFactory: HttpRequestConfigFactory
  ) {}

  public async request<T>(
    name: RequestType,
    args: RequestArgs,
    headers?: { [key: string]: string },
    accessToken?: string
  ): Promise<ApiResponse<T>> {
    const options = this.httpRequestConfigFactory.create(
      name,
      args,
      headers,
      accessToken
    );
    this.logger.debug(this.TAG, "Making API call with options", options);
    try {
      const response = await this.httpAdapter.request<T>(options);
      if ([200, 201, 204].includes(response.status)) {
        this.logger.debug(
          this.TAG,
          "API call successful with status",
          response.status,
          response.data
        );
        return options.onTransformResponse(response);
      } else {
        this.logger.debug(
          this.TAG,
          "Non 200 status calling external API with options",
          options,
          "status was",
          response.status,
          "Response was",
          response
        );
        return {
          error: {
            status: response.status,
            message: response.statusText || "",
          },
        };
      }
    } catch (e) {
      this.logger.error(this.TAG, "API client error", { request: name }, e);
      const response = {
        error: {
          status: 500,
          message: "Unknown error",
        },
      };

      const err = e as AxiosError;
      if (err.isAxiosError) {
        response.error = {
          status: err.response?.status || 500,
          message: err.response?.statusText || "Unexpected Error",
        };
      }
      return response;
    }
  }
}
