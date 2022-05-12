import { ApiResponse, SkuSubRequest } from "@app/core/api/backend";
import { CustomerSwapList } from "@app/feature/home/HomeView";
import { HttpResponse } from "@services/http/adapters/http-adapter";
import { PartialRequestConfig } from "@services/http/http-request-map";

type GetOrderResponse = {
  order_id: string;
  customer_id: string;
  customer_name: string;
  recipe_name: string;
  swap_name: string;
  actual_ingredient: string;
  options_available: string[];
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
      response: HttpResponse<GetOrderResponse[]>
    ): ApiResponse<CustomerSwapList> => {
      return {
        data: response.data.map((r) => {
          return {
            orderId: r.order_id,
            customerId: r.customer_id,
            customerName: r.customer_name,
            recipe: r.recipe_name,
            swap: r.swap_name,
            ingredient: r.actual_ingredient,
            availability: r.options_available,
          };
        }),
      };
    },
  },
});
