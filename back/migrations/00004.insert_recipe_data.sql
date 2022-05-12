
INSERT INTO public.substitute_options (order_id, recipe_name, swap_name, actual_ingredient,swap_options)
VALUES ('121223', 'Garlic & Herb Chicken with Roast Veggie Toss & Creamy Pesto', 'C2', 'Chicken', ARRAY['Chicken breast', 'Pork']);

INSERT INTO public.substitute_options (order_id, recipe_name, swap_name, actual_ingredient,swap_options)
VALUES ('121224', 'Apricot Coconut Slice', 'D2', 'Apricot', ARRAY['Apple', 'Pears']);

INSERT INTO public.substitute_options (order_id, recipe_name, swap_name, actual_ingredient,swap_options)
VALUES ('121225', 'Beef Sausages & Parmesan Mash', 'E2', 'Beef', ARRAY['Chicken', 'Pork']);

INSERT INTO public.substitute_options (order_id, recipe_name, actual_ingredient, substitute_ingredient,order_status)
VALUES ('121221', 'Chicken Burger', 'Chicken', 'Pork', 'Pending');

INSERT INTO public.substitute_options (order_id, recipe_name, actual_ingredient, substitute_ingredient,order_status)
VALUES ('121222', 'Ginger Tofu & Peanut Rice', 'Tofu', 'Halloumi', 'Pending');

INSERT INTO public.substitute_options (order_id, recipe_name, actual_ingredient, substitute_ingredient,order_status)
VALUES ('121223', 'Garlic & Herb Chicken with Roast Veggie Toss & Creamy Pesto', 'Chicken breast', 'Chicken thigh', 'Pending');

INSERT INTO public.substitute_options (order_id, recipe_name, actual_ingredient, substitute_ingredient,order_status)
VALUES ('121223', 'Beef Sausages & Parmesan Mash', 'Beef', 'Chicken', 'Pending');