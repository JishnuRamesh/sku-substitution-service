import { useApiContext } from "@app/core/api/ApiContext";
import { RecipeSwapCard } from "@app/feature/home/RecipeSwapCard";
import React, { useEffect, useState } from "react";

type Order = {
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

type CustomerSwapOption = {
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

export type CustomerSwapOptions = {
  options_available: CustomerSwapOption[];
};

const SwapOptions: React.FC<CustomerSwapOptions> = (props) => {
  return (
    <>
      {props.options_available.map((option, index) => (
        <SwapOption key={`Swap-${index}`} {...option} />
      ))}
    </>
  );
};

const SwapOption: React.FC<CustomerSwapOption> = (props) => {
  return <RecipeSwapCard {...props} />;
};

export function HomeView() {
  const api = useApiContext();
  const [customerSwapOptions, setCustomerSwapOptions] =
    useState<CustomerSwapOptions>({ options_available: [] });
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = "121221";
  useEffect(() => {
    api
      ?.apiRequest<{ orderId: string }, CustomerSwapOptions>(
        `getSkuSubOptions`,
        {
          orderId,
        }
      )
      .then((res) => {
        if (res.data) {
          if (res.data.options_available?.length) {
            setCustomerSwapOptions(res.data);
            setOrder(res.data.options_available[0].order_id);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [api]);

  if (customerSwapOptions.options_available.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>
        An important update to your recipe
        {customerSwapOptions.options_available.length > 1 ? `s` : ``}!
      </h1>
      <p>Hi {order?.customer_id.name},</p>
      <p>
        Each week, we search the nation for the freshest produce available. When
        we're unable to source an ingredient that meets our high quality
        standards, you'll be able to swap it for something just as tasty.
      </p>
      <p>
        That's why this week, you have the option of swapping the following
        options.
      </p>
      <SwapOptions {...customerSwapOptions} />
      <p>
        We've made some slight tweaks to the recipe instructions but don't worry
        - we will send you updated recipe instructions before your box arrives
        and your dinner will still taste just as delicious!
      </p>
      <p>
        Happy cooking,
        <br />
        The HelloFresh Team
      </p>
    </div>
  );
}
