export type RequestArgs = { [key: string]: any };

export type ApiBaseArgs = Record<string, unknown>;

export type ApiError = {
  status: number;
  message: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyResponse = {};
export type ApiResponse<T extends EmptyResponse> = {
  data?: T;
  error?: ApiError;
};

export type MessageResponse = {
  message: string;
};

export type SkuSubRequest = "helloWorld" | "getSkuSubOptions";
export type RequestType = SkuSubRequest;

export type NetworkType = "factory" | "http";

export interface RequestMeta {
  headers?: { [key: string]: string };
}

export interface ApiClient {
  request<T>(
    name: RequestType,
    args: RequestArgs,
    headers?: { [key: string]: string },
    accessToken?: string
  ): Promise<ApiResponse<T>>;
}
