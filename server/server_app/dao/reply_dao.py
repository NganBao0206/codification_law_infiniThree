from server_app import db
from models import Reply

def add_reply(content,question_id, user_id):
    reply = Reply(content=content,
                question_id=question_id,
                user_id=user_id)
    db.session.add(reply)
    db.session.commit()
    return reply

def get_replies_by_question(question_id):
    return Reply.query.filter(Reply.question_id.__eq__(question_id)).order_by(Reply.created_at).all()

def get_replies_by_user(user_id):
    return Reply.query.filter(Reply.user_id.__eq__(user_id)).order_by(Reply.created_at).all()