from server_app import db
from models import Reply
from config import PER_PAGE


def add_reply(content,question_id, user_id):
    reply = Reply(content=content,
                question_id=question_id,
                user_id=user_id)
    db.session.add(reply)
    db.session.commit()
    return reply


def get_replies(question_id: str = None, page: int = 1, per_page: int = PER_PAGE):
    query = db.session.query(Reply)
    if question_id:
        query = query.filter(Reply.question_id.__eq__(question_id))
    
    query = query.offset((page - 1) * per_page).limit(per_page)

    return query.all()


def count_replies(question_id: str = None):
    query = db.session.query(Reply)
    if question_id:
        query = query.filter(Reply.question_id.__eq__(question_id)).all()
    return query.count()