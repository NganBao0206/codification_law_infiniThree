from server_app import db
from models import Question
from server_app import db
from config import PER_PAGE
from models import Question
from sqlalchemy import or_, func
    

def add_question(title, description, topic_id, user_id):
    question = Question(title=title,
                description=description,
                topic_id=topic_id,user_id=user_id)
    db.session.add(question)
    db.session.commit()
    return question


def get_question(kw: str = None, user_id: int = None, topic_id: str = None, page: int = 1, per_page: int = PER_PAGE):
    query = db.session.query(Question)

    if kw and kw.strip() != "":
        query = query.filter(or_(Question.title.ilike(f"%{kw}%"), Question.description.ilike(f"%{kw}%")))

    if user_id is not None:
        query = query.filter(Question.user_id.__eq__(user_id))

    if topic_id is not None:
        query = query.filter(Question.topic_id.__eq__(topic_id))

    query = query.offset((page - 1) * per_page).limit(per_page)

    return query.all()


def count_question(kw: str = None):
    query = db.session.query(Question)
    if kw and kw.strip() != "":
        query = query.filter(or_(Question.title.ilike(f"%{kw}%"), Question.description.ilike(f"%{kw}%")))
    return query.count()
