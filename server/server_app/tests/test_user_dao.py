from models import *
from server_app.dao.user_dao import *


name = "Test User 123"
username = "testuser123"
password = "testpassword123"
email = "test123user@example.com"

def test_add_user(db_test):
    add_user(name=name, username=username, password=password, email=email)
    user_from_db = db_test.session.query(User).filter(User.username == username).first()
    assert user_from_db is not None
    assert user_from_db.username == username
    assert user_from_db.email == email


def test_get_user_by_username():
    user = get_user_by_username(username=username)
    assert user is not None
    assert user.username == username

def test_get_user_by_email():
    user = get_user_by_email(email=email)
    assert user is not None
    assert user.email == email

def test_auth_user():
    user = auth_user(username, password)
    assert user is not None
    assert user.username == username