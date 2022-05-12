create table customer
(
    customer_id varchar primary key,
    address varchar,
    email_address varchar
);

create table customer_order (
    order_id varchar primary key,
    customer_id varchar references customer,
    customer_swaps  varchar
);



