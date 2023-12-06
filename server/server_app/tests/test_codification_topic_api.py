import json
from . import topic1, topic2, sub_topic1_1, sub_topic1_2

def test_get_topics(client):
    response = client.get('/api/codification-topics/')
    assert response.status_code == 200
    assert response.content_type == 'application/json'

    data = json.loads(response.data)
    assert topic1.to_dict() in data
    assert topic2.to_dict() in data


def test_get_sub_topics(client):
    id = topic1.id
    response = client.get('/api/codification-topics/{}/sub-topics/'.format(id))
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    
    
    data = json.loads(response.data)
    assert sub_topic1_1.to_dict() in data
    assert sub_topic1_2.to_dict() in data
    