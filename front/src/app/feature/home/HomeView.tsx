import { SelectedOptions } from "@app/App";
import { useApiContext } from "@app/core/api/ApiContext";
import { RecipeSwapCard } from "@app/feature/home/RecipeSwapCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

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

const SwapOptions: React.FC<
  CustomerSwapOptions & {
    onChange: (recipe: string, ingredient: string, selection: string) => void;
  }
> = (props) => {
  return (
    <Grid container spacing={2}>
      {props.options_available.map((option, index) => (
        <Grid key={`Swap-${index}`} item xs={12} sm={6}>
          <SwapOption {...option} onChange={props.onChange} />
        </Grid>
      ))}
    </Grid>
  );
};

const SwapOption: React.FC<
  CustomerSwapOption & {
    onChange: (recipe: string, ingredient: string, selection: string) => void;
  }
> = (props) => {
  return (
    <RecipeSwapCard
      recipe_name={props.recipe_name}
      actual_ingredient={props.actual_ingredient}
      swap_options={props.swap_options}
      onChange={(selection: string) => {
        props.onChange(props.recipe_name, props.actual_ingredient, selection);
      }}
    />
  );
};

export const HomeView: React.FC<{
  onSelected: (options: SelectedOptions) => void;
  selectedOptions: SelectedOptions;
  isDone: boolean;
}> = (props) => {
  const api = useApiContext();
  const [customerSwapOptions, setCustomerSwapOptions] =
    useState<CustomerSwapOptions>({ options_available: [] });
  const [order, setOrder] = useState<Order | null>(null);
  const orderId = "121221";

  const onChange = (recipe: string, ingredient: string, selection: string) => {
    const nextSelectedOptions = props.selectedOptions;
    nextSelectedOptions[recipe] = {
      recipe_name: recipe,
      actual_ingredient: ingredient,
      substituted_ingredient: selection,
      order_status: "PENDING",
    };
    console.log("next selected: ", nextSelectedOptions);
    props.onSelected(nextSelectedOptions);
  };

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

  useEffect(() => {
    if (props.isDone) {
      console.log("WILL POST:", props.selectedOptions);
    }
  }, [api, props.selectedOptions, props.isDone]);

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
      <SwapOptions {...customerSwapOptions} onChange={onChange} />
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
};
