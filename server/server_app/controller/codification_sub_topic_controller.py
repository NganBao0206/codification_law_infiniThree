from flask import jsonify
from server_app.dao.codification_index_dao import get_indexes_of_sub_topic
from server_app.dao.legal_document_dao import get_legal_document_by_sub_topic_id
from server_app.dao.codification_sub_topic_dao import get_sub_topics

# [GET] - /api/codification-sub-topics/
def get_all_sub_topics():
    indexes = get_sub_topics()
    return jsonify([index.to_dict() for index in indexes])

# [GET] - /api/codification-sub-topics/<sub_topic_id>/indexes/
def get_indexes_sub_topic(sub_topic_id):
    indexes = get_indexes_of_sub_topic(sub_topic_id)
    return jsonify([index.to_dict() for index in indexes])


# [GET] - /api/codification-sub-topics/<sub_topic_id>/legal-documents/
def get_legal_docs_by_sub_topic(sub_topic_id):
    docs = get_legal_document_by_sub_topic_id(sub_topic_id=sub_topic_id)
    return jsonify([doc.to_dict() for doc in docs])


