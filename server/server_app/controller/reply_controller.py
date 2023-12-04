from flask import jsonify, request
from server_app.dao import reply_dao

def add_reply():
    content = request.form.get("content",None)
    user_id = request.form.get('user_id', None)
    question_id = request.form.get('question_id',None)
    
    try:
        question = reply_dao.add_reply(content=content, question_id=question_id,user_id = user_id)
        if question:
            return jsonify({"msg": "Post Question sucess"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400
    
    

def get_replies_by_question(question_id):
    replies = reply_dao.get_replies_by_question(question_id)
    return jsonify([reply.to_dict() for reply in replies])


def get_replies_by_user(user_id):
    replies = reply_dao.get_replies_by_user(user_id)
    return jsonify([reply.to_dict() for reply in replies])