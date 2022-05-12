import { RequestArgs, RequestType } from "@app/core/api/backend";
import { Log } from "@domain/logger/log";
import { ContentType, HttpRequest } from "@services/http/adapters/http-adapter";
import { HttpRequestMap } from "@services/http/http-request-map";

export class HttpRequestConfigFactory {
  private TAG = "http-request-factory";
  private requestMap: HttpRequestMap;
  constructor(private logger: Log) {
    this.requestMap = new HttpRequestMap();
  }

  public create(
    name: RequestType,
    args: RequestArgs,
    headers: { [key: string]: string } = {},
    accessToken?: string
  ): HttpRequest {
    const config = this.requestMap.find(name);

    if (config.requiresAuth) {
      if (!accessToken) {
        const err = new Error(
          "Attempting to call an endpoint which requires authorization without credentials"
        );
        this.logger.error(this.TAG, { ...config }, err);
        throw err;
      }
      headers.Authorization = `Bearer ${accessToken}`;
      headers.AuthProvider = `azure`;
    }

    let options: HttpRequest = {
      baseURL: config.baseURL,
      url: this.replaceUrlPathParams(config.url, args, config.path),
      method: config.method,
      headers: {
        Accept: "application/json",
        "Content-Type": config.contentType,
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
      params: this.extractParams(args, config.params),
      data: this.createRequestBody(config.contentType, args, config.data),
      responseType: "json",
      noop: name,
      onTransformResponse: (response) =>
        config.transformResponse(response, { args }),
    };

    if (config.transformRequest) {
      options = config.transformRequest(options);
    }

    this.logger.debug(
      this.TAG,
      "Created HttpRequest from config",
      config,
      options,
      name,
      args,
      headers
    );
    return options;
  }

  private extractParams(args: RequestArgs, params: string[] = []) {
    return this.mapArgsForProperties(args, params);
  }

  public replaceUrlPathParams(
    url: string,
    args: RequestArgs,
    params: string[] = []
  ): string {
    if (!params.length) {
      return url;
    }
    return params
      .map((p) => [p, `:${p}`])
      .reduce((acc, match) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!args.hasOwnProperty(match[0])) {
          const errorMessage = new Error(
            `args do not contain match for path parameter - ${match[1]}`
          );
          this.logger.error(this.TAG, errorMessage);
          throw errorMessage;
        }
        return acc.replace(match[1], encodeURIComponent(args[match[0]]));
      }, url);
  }

  private createRequestBody(
    contentType: ContentType,
    args: RequestArgs,
    properties: string[] = []
  ) {
    if (contentType === "application/x-www-form-urlencoded") {
      return this.createFormDataUrlUnencoded(args, properties);
    }
    // WIP: Temporary condition while the backend is being adjusted to support this new data pattern
    else if (contentType === "application/json" && args.metadataValues) {
      return args.metadataValues;
    } else {
      return this.mapArgsForProperties(args, properties);
    }
  }

  private mapArgsForProperties(args: RequestArgs, properties: string[] = []) {
    return Object.keys(args)
      .filter((key) => properties.includes(key))
      .reduce((obj: { [key: string]: any }, key) => {
        obj[key] = args[key];
        return obj;
      }, {});
  }

  private createFormDataUrlUnencoded(
    args: RequestArgs,
    properties: string[] = []
  ) {
    return Object.keys(args)
      .filter((key) => properties.includes(key))
      .reduce((data, key, index, all) => {
        data += `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
        if (index !== all.length - 1) {
          data += "&";
        }
        return data;
      }, "");
  }
}
