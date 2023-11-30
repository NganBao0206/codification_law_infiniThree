from server_app import db
from models import User
import hashlib

def add_user(name, username, password, **kwargs):
    user = User(name=name,
                username=username,
                password=str(hashlib.md5(password.strip().encode("utf-8")).hexdigest()), email=kwargs.get('email'), avatar = kwargs.get('avatar'))
    db.session.add(user)
    db.session.commit()
    return user


def get_user_by_username(username):
    return User.query.filter(User.username.__eq__(username.strip())).first()


