import pytest
from pytest_mysql import factories

mysql_my_proc = factories.mysql_proc(port=None)

@pytest.fixture(scope='session')
def connection(mysql_my_proc):
    conn = mysql_my_proc.connection()
    yield conn
    conn.close()

@pytest.fixture(scope='session')
def cursor(connection):
    cursor = connection.cursor()
    yield cursor
    cursor.close()