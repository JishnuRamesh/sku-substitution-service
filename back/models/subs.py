from peewee import Model, CharField, ForeignKeyField, PostgresqlDatabase, CompositeKey
from playhouse.postgres_ext import ArrayField


db = PostgresqlDatabase(
        "postgres",
        user='sku-sub-service',
        password='sku-sub-service',
        host='localhost',
        port=5432,
        autorollback=True,
    )


class Customer(Model):
    customer_id = CharField(primary_key=True)
    name = CharField()
    address = CharField()
    email_address = CharField()

    class Meta:
        database = db
        table_name = 'customer'


class Orders(Model):
    order_id = CharField(primary_key=True)
    customer_id = ForeignKeyField(Customer)
    customer_swaps = CharField()
    week = CharField()

    class Meta:
        database = db
        table_name = 'customer_order'


class Sub_options(Model):
    order_id = ForeignKeyField(Orders)
    recipe_name = CharField()
    swap_name = CharField()
    actual_ingredient = CharField()
    swap_options = ArrayField(CharField)

    class Meta:
        primary_key = CompositeKey('order_id', 'actual_ingredient')
        database = db
        table_name = 'substitute_options'


class Customer_subs(Model):
    order_id = ForeignKeyField(Orders)
    recipe_name = CharField()
    actual_ingredient = CharField()
    substitute_ingredient = CharField()
    order_status = CharField()

    class Meta:
        primary_key = CompositeKey('order_id', 'recipe_name')
        database = db
        table_name = 'customer_substitutions'


