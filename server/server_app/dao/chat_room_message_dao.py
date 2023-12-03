from server_app import db
from models import Message, ChatRoom

def add_message(chat_room_id, content, is_user_message):
    msg = Message(chat_room_id = chat_room_id, content=content, is_user_message=is_user_message)
    db.session.add(msg)
    db.session.commit()
    return msg 


def get_message(chat_room_id):
    return db.session.query(Message).filter(Message.chat_room_id.__eq__(chat_room_id)).all()


def add_chat_room(name, user):
    room = ChatRoom(name=name, user=user)
    db.session.add(room)
    db.session.commit()
    return room