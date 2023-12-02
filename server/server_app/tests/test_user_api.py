import json
from models import User
from flask import jsonify


def test_register(client, db_test):
    username = "test_user_api"
    email = "test_user_api@example.com"
    name = "Test User Api"
    password = "test123"
    avatar = None

    response = client.post('/api/users/register/', data={
        'username': username,
        'email': email,
        'name': name,
        'password': password,
        'avatar': avatar
    })
    assert response.status_code == 201
    assert response.content_type == 'application/json'

    data = json.loads(response.data)
    assert data['msg'] == "register sucess"

    user = User.query.filter(User.username.__eq__(username)).first()
    assert user is not None
    assert user.email == email
    assert user.name == name
    assert user.username == username
    assert user.avatar == avatar
    


def test_login(client, db_test):
    username = "test_user_api"
    password = "test123"
    user_data = {
        'username': username,
        'password': password
    }
    response = client.post('/api/users/login/', json=user_data)
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    data = json.loads(response.data)
    assert 'access_token' in data
    assert 'user' in data
    assert data['user']['username'] == username



def test_check_username_existed(client, db_test):
    username = "test_user"
    user = User(username=username)
    db_test.session.add(user)
    db_test.session.commit()

    response = client.get('/api/users/username-existed/', query_string={
        'username': username
    })
    assert response.status_code == 302
    assert response.content_type == 'application/json'

    data = json.loads(response.data)
    assert data['msg'] == "existed"



def test_check_email_existed(client, db_test):
    email = "test@example.com"
    user = User(email=email)
    db_test.session.add(user)
    db_test.session.commit()

    response = client.get('/api/users/email-existed/', query_string={
        'email': email
    })
    assert response.status_code == 302
    assert response.content_type == 'application/json'

    data = json.loads(response.data)
    assert data['msg'] == "existed"
