from yoyo import get_backend, read_migrations


def apply_migrations():
    """
    This method applies remaining database migrations
    to the concerned database table
    """
    migrations_path = './migrations'
    backend = get_backend(
        "postgres://sku-sub-service:sku-sub-service@localhost/postgres"
    )
    migrations = read_migrations("{}".format(migrations_path))

    with backend.lock():
        backend.apply_migrations(backend.to_apply(migrations))