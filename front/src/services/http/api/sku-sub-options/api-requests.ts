import { ApiResponse, SkuSubRequest } from "@app/core/api/backend";
import { CustomerSwapOptions } from "@app/feature/home/HomeView";
import { HttpResponse } from "@services/http/adapters/http-adapter";
import { PartialRequestConfig } from "@services/http/http-request-map";

type SwapOption = {
  actual_ingredient: string;
  order_id: {
    customer_id: {
      address: string;
      customer_id: string;
      email_address: string;
      name: string;
    };
    customer_swaps: string;
    order_id: string;
    week: string;
  };
  recipe_name: string;
  swap_name: string;
  swap_options: [string, string];
};

type GetOptionsResponse = {
  options_available: SwapOption[];
};

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
      response: HttpResponse<GetOptionsResponse>
    ): ApiResponse<CustomerSwapOptions> => {
      return {
        data: response.data,
      };
    },
  },
});
