from server_app import db
from models import CodificationIndex, codification_sub_topic_index, codification_index_parent

def get_indexes_of_sub_topic(sub_topic_id):
    return db.session.query(CodificationIndex)\
            .join(codification_sub_topic_index)\
            .filter(codification_sub_topic_index.c.sub_topic_id == sub_topic_id)\
            .all()
            
def get_child_indexes_of_index(index_id):
    index_parent = db.session.query(CodificationIndex).get(index_id)
    return index_parent.children
