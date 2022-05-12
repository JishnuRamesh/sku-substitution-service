import { ApiResponse, SkuSubRequest } from "@app/core/api/backend";
import { HttpResponse } from "@services/http/adapters/http-adapter";
import { PartialRequestConfig } from "@services/http/http-request-map";

export type SkuSubRequestMap = () => Record<
  SkuSubRequest,
  PartialRequestConfig
>;
export const skuSubApiRequests: SkuSubRequestMap = () => ({
  helloWorld: {
    url: `/`,
    method: "GET",
    transformResponse: (
      response: HttpResponse<{ msg?: string }>
    ): ApiResponse<string> => ({
      data: response.data?.msg,
    }),
  },
  getSkuSubOptions: {
    url: `/sku-sub-options/:orderId`,
    method: "GET",
    path: ["orderId"],
    transformResponse: (
      response: HttpResponse<{ orderId: string; customerId: string }>
    ): ApiResponse<{ orderId: string; customerId: string }> => ({
      data: {
        orderId: response.data.orderId,
        customerId: response.data.customerId,
      },
    }),
  },
});
