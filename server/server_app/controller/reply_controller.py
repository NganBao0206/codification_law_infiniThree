from flask import jsonify, request
from server_app.dao import reply_dao
import math
from config import PER_PAGE

def add_reply():
    content = request.json.get("content",None)
    user_id = request.json.get('user_id', None)
    question_id = request.json.get('question_id',None)
    try:
        question = reply_dao.add_reply(content=content, question_id=question_id,user_id = user_id)
        if question:
            return jsonify({"msg": "Post Question sucess"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400
    
    
def get_replies():
    question_id = request.args.get('question_id', default=None, type=str)

    results = reply_dao.get_replies(question_id)
    count = reply_dao.count_replies(question_id)
    total_pages = math.ceil(count / PER_PAGE)

    reponse = jsonify ({
        "total_pages": total_pages,
        "total_replies": count,
        "replies": [result.to_dict() for result in results]
    })
    
    return reponse, 200
