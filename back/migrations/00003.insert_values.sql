INSERT INTO public.customer (customer_id, address, email_address, name) VALUES ('367676', '879 Edgewood Road', 'tester1@gmail.com', 'Abhi');
INSERT INTO public.customer (customer_id, address, email_address, name) VALUES ('367679', '4198 Wakefield Street', 'tester2@gmail.com', 'Jish');
INSERT INTO public.customer (customer_id, address, email_address, name) VALUES ('467676', '4585 Cityview Drive', 'tester3@gmail.com', 'Sangetha');
INSERT INTO public.customer (customer_id, address, email_address, name) VALUES ('363676', '1203 Newton Street', 'tester4@gmail.com', 'Jermey');
INSERT INTO public.customer (customer_id, address, email_address, name) VALUES ('362676', '472 Westfall Avenue', 'tester5@gmail.com', 'Sandy');


INSERT INTO public.customer_order (order_id, customer_id, customer_swaps, week) VALUES ('121221', '367676', 'A2_B2_C2', '2022-W20');
INSERT INTO public.customer_order (order_id, customer_id, customer_swaps, week) VALUES ('121222', '367679', 'A2_D2_C2', '2022-W20');
INSERT INTO public.customer_order (order_id, customer_id, customer_swaps, week) VALUES ('121223', '467676', 'E2_B2_F2', '2022-W20');
INSERT INTO public.customer_order (order_id, customer_id, customer_swaps, week) VALUES ('121224', '363676', 'A4_Z4_K4,Z4', '2022-W20');
INSERT INTO public.customer_order (order_id, customer_id, customer_swaps, week) VALUES ('121225', '362676', 'A2_B2_C2', '2022-W20');