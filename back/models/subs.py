from peewee import Model, CharField, ForeignKeyField, PostgresqlDatabase
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
    Address = CharField()

    class Meta:
        database = db
        schema = 'public'


class Orders(Model):
    order_id = CharField(primary_key=True)
    customer_id = ForeignKeyField(Customer)
    customer_swaps = CharField()

    class Meta:
        database = db
        schema = 'public'


class Sub_options(Model):
    order_id = ForeignKeyField(Orders)
    recipe_name = CharField()
    swap_name = CharField()
    actual_ingredient = CharField()
    swap_options = ArrayField(CharField)

    class Meta:
        database = db
        schema = 'public'


class Customer_subs(Model):
    order_id = ForeignKeyField(Orders)
    recipe_name = CharField()
    actual_ingredient = CharField()
    substitute_ingredient = CharField()
    order_status = CharField()

    class Meta:
        database = db
        schema = 'public'

