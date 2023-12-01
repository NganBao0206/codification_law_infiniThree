from config import PER_PAGE
from server_app import db
from models import Terminology
from sqlalchemy import or_, func

def get_terminology(kw: str = None, page: int = 1, per_page: int = PER_PAGE):
    query = db.session.query(Terminology)

    if kw and kw.strip() != "":
        query = query.filter(or_(Terminology.value.ilike(f"%{kw}%"), Terminology.description.ilike(f"%{kw}%")))
        query = query.order_by(func.length(Terminology.value), Terminology.value)
    
    query = query.offset((page - 1) * per_page).limit(per_page)

    return query.all()

def count_terminology(kw: str = None):
    query = db.session.query(Terminology)

    if kw and kw.strip() != "":
        query = query.filter(or_(Terminology.value.ilike(f"%{kw}%"), Terminology.description.ilike(f"%{kw}%")))

    return query.count()

