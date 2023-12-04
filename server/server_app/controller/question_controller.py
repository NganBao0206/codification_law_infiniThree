from flask import jsonify, request
from server_app.dao import question_dao
from flask_jwt_extended import jwt_required
import math
from config import PER_PAGE


@jwt_required()
def add_question():
    title = request.form.get("title", None)
    description = request.form.get("description", None)
    user_id = request.form.get('user_id', None)
    topic_id = request.form.get('topic_id',None)
    
    try:
        question = question_dao.add_question(title = title, description = description, topic_id=topic_id,user_id = user_id)
        if question:
            return jsonify({"msg": "Post Question sucess"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400



def get_questions():
    kw = request.args.get('kw', default=None, type=str)
    page = request.args.get('page', default=1, type=int)

    results = question_dao.get_question(kw, page)
    count = question_dao.count_question(kw)
    total_pages = math.ceil(count / PER_PAGE)

    reponse = jsonify ({
        "total_pages": total_pages,
        "total_questions": count,
        "questions": [result.to_dict() for result in results]
    })
    
    return reponse, 200



def get_question_by_topic(topic_id):
    replies = question_dao.get_question_by_topic(topic_id)
    return jsonify([reply.to_dict() for reply in replies])



def get_question_by_user(user_id):
    replies = question_dao.get_question_by_user(user_id)
    return jsonify([reply.to_dict() for reply in replies])