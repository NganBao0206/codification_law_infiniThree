from models import *
from server_app import db
from server_app.dao.codification_index_dao import get_indexes_of_sub_topic, get_child_indexes_of_index
from . import sub_topic1_1, sub_topic1_2, sub_topic2_1 ,index1_1_1, index1_1_2, index1_1_1_1, index1_1_1_2, index1_2_1, index1_2_2, index2_1_1



def test_get_indexes_of_sub_topic():    
    indexes = get_indexes_of_sub_topic(sub_topic1_1.id)
    assert len(indexes) == 2
    assert index1_1_1 in indexes
    assert index1_1_2 in indexes
    
    indexes = get_indexes_of_sub_topic(sub_topic1_2.id)
    assert len(indexes) == 2
    assert index1_2_1 in indexes
    assert index1_2_2 in indexes    
    
    indexes = get_indexes_of_sub_topic(sub_topic2_1.id)
    assert len(indexes) == 1
    assert index2_1_1 in indexes    
    
    
    
    
def test_get_child_indexes_of_index(db_test):    
    indexes = get_child_indexes_of_index(index1_1_1.id)
    assert len(indexes) == db_test.session.query(codification_index_parent).filter(codification_index_parent.c.index_parent_id.__eq__(index1_1_1.id)).count()
    assert index1_1_1_1 in indexes
    assert index1_1_1_2 in indexes