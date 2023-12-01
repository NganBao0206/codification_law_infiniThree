from flask import jsonify, request
from server_app.dao import terminology_dao
import math
from config import PER_PAGE


def get_terminology():
    kw = request.args.get('kw', default=None, type=str)
    page = request.args.get('page', default=1, type=int)

    results = terminology_dao.get_terminology(kw, page)
    count = terminology_dao.count_terminology(kw)
    total_pages = math.ceil(count / PER_PAGE)

    reponse = jsonify ({
        "total_pages": total_pages,
        "total_terminologies": count,
        "terminologies": [result.to_dict() for result in results]
    })
    
    return reponse, 200
