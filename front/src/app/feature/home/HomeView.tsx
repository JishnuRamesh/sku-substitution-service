import { useApiContext } from "@app/core/api/ApiContext";
import { useEffect, useState } from "react";

export type CustomerRecipeSwap = {
  orderId: string;
  customerId: string;
  customerName: string;
  recipe: string;
  swap: string;
  ingredient: string;
  availability: string[];
};
export type CustomerSwapList = CustomerRecipeSwap[];

export function HomeView() {
  const api = useApiContext();
  const [customerSwapList, setCustomerSwapList] = useState<CustomerSwapList>(
    []
  );
  const orderId = "AU112233445";
  useEffect(() => {
    api
      ?.apiRequest<{ orderId: string }, CustomerSwapList>(`getSkuSubOptions`, {
        orderId,
      })
      .then((res) => {
        if (res.data) {
          setCustomerSwapList(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [api]);
  return (
    <div>
      <h1>Welcome to the SKU Substitution Service</h1>
      <h3>
        The customer swap list is:{" "}
        {customerSwapList.length ? customerSwapList : `EMPTY`}
      </h3>
    </div>
  );
}
