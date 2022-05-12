create table substitute_options (
    order_id varchar references customer_order,
    recipe_name varchar ,
    swap_name varchar,
    actual_ingredient VARCHAR,
    swap_options VARCHAR[]
);

create table customer_substitutions (
    order_id varchar references customer_order,
    recipe_name varchar ,
    actual_ingredient varchar,
    substitute_ingredient varchar,
    order_status varchar

);