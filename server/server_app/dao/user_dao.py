from server_app import db, bcrypt
from models import User
import hashlib

def add_user(name, username, password, email, avatar = None):
    user = User(name=name,
                username=username,
                password=str(bcrypt.generate_password_hash(password).decode('utf-8')), email=email, avatar=avatar)
    db.session.add(user)
    db.session.commit()
    return user


def get_user_by_username(username):
    return User.query.filter(User.username.__eq__(username.strip())).first()


def auth_user(username, password):
    user = get_user_by_username(username=username)
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    return None

