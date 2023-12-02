import pytest
from server_app import app, db
from sqlalchemy.orm import sessionmaker, scoped_session
from server_app.api.codification_topic_api import codification_topics_bp
from server_app.api.codification_sub_topic_api import codification_sub_topics_bp
from server_app.api.codification_indexes_api import codification_indexes_bp
from server_app.api.user_api import user_bp
from server_app.api.terminology_api import terminology_bp



@pytest.fixture(scope='session', autouse=True)
def app_test():
    app.config.update({"TESTING": True})
    app.config['JWT_SECRET_KEY'] = "31231231hn1j2kbkjn13u123ih11"

    yield app


@pytest.fixture(scope='session')
def client(app_test):
    app_test.register_blueprint(codification_topics_bp, url_prefix='/api/codification-topics')
    app_test.register_blueprint(codification_sub_topics_bp, url_prefix='/api/codification-sub-topics')
    app_test.register_blueprint(codification_indexes_bp, url_prefix='/api/codification-indexes')
    app_test.register_blueprint(user_bp, url_prefix='/api/users')
    app_test.register_blueprint(terminology_bp, url_prefix='/api/terminologies')
    with app_test.test_client() as client:
        yield client
        

@pytest.fixture()
def runner(app_test):
    return app_test.test_cli_runner()


@pytest.fixture(scope='session', autouse=True)
def db_test(app_test, request):
    with app_test.app_context(): 
        connection = db.engine.connect()
        transaction = connection.begin()
        session = scoped_session(sessionmaker(bind=connection, binds={}))

        db.session = session

        yield db
        transaction.rollback()
        connection.close()
        session.remove()



