from server_app import db
from models import CodificationIndex, codification_index_parent

def get_indexes_of_sub_topic(sub_topic_id):
    return db.session.query(CodificationIndex)\
            .filter(CodificationIndex.sub_topic_id == sub_topic_id)\
            .filter(CodificationIndex.parent == None)\
            .order_by(CodificationIndex.order)\
            .all()
            
def get_child_indexes_of_index(index_id):
    return db.session.query(CodificationIndex)\
        .join(codification_index_parent, CodificationIndex.id == codification_index_parent.c.id)\
        .filter(codification_index_parent.c.index_parent_id == index_id)\
        .order_by(CodificationIndex.order)\
        .all()
        
    