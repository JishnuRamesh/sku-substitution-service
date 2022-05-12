import { Api, ApiContext } from "@app/core/api/ApiContext";
import { ApiError, RequestType } from "@app/core/api/backend";
import { Log } from "@domain/logger/log";
import { AxiosAdapter } from "@services/http/adapters/axios-adapter";
import { HttpAdapter } from "@services/http/adapters/http-adapter";
import { HttpClient } from "@services/http/http-client";
import { HttpRequestConfigFactory } from "@services/http/http-request-factory";
import { Logger } from "@services/logging/logger";
import { ReactNode, useState } from "react";

const L: Log = new Logger({ env: `development` });
const httpAdapter: HttpAdapter = new AxiosAdapter();
const httpRequestConfigFactory = new HttpRequestConfigFactory(L);
const client = new HttpClient(L, httpAdapter, httpRequestConfigFactory);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<ApiError | null>(null);

  const apiClient: Api = {
    apiRequest: async (configName, args) => {
      return client.request(configName as RequestType, args);
    },
    error,
    setError,
  };

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}
