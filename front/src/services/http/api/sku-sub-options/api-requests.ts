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
      response.data.options_available.push({
        actual_ingredient: "Salmon",
        order_id: {
          customer_id: {
            address: "879 Edgewood Road",
            customer_id: "367676",
            email_address: "tester1@gmail.com",
            name: "Abhi",
          },
          customer_swaps: "A2_B2_C2",
          order_id: "121221",
          week: "2022-W20",
        },
        recipe_name: "Asian style pokebowl",
        swap_name: "F2",
        swap_options: ["Barramundi", "Chicken"],
      });
      return {
        data: response.data,
      };
    },
  },
});
