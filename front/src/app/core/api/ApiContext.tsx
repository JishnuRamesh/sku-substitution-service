import { ApiError, ApiResponse } from "@app/core/api/backend";
import { createContext, useContext } from "react";

type RequestType = string;
type RequestArgs = {
  showLoader?: boolean;
  showNotification?: boolean;
  [key: string]: unknown;
};

export interface Api {
  apiRequest: <T extends RequestArgs, R>(
    name: RequestType,
    args: T
  ) => Promise<ApiResponse<R>>;
  error: ApiError | null;
  setError: (error: ApiError) => void;
}

export const ApiContext = createContext<Api | null>(null);

export function useApiContext() {
  return useContext(ApiContext);
}
