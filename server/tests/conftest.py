import pytest
from server_app import create_app_test, create_db_test
from sqlalchemy.orm import scoped_session, sessionmaker


@pytest.fixture(scope='session')
def app():
    app = create_app_test()
    app.config.update({"TESTING": True})
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


@pytest.fixture(scope='session', autouse=True)
def db_session(app, request):
    with app.app_context():
        db = create_db_test(app)
        connection = db.engine.connect()
        transaction = connection.begin()

        session = scoped_session(sessionmaker(bind=connection, binds={}))

        db.session = session

        yield session

        transaction.rollback()
        connection.close()
        session.remove()







