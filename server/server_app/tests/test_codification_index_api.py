from . import index1_1_1, index1_1_1_1, index1_1_1_2
import json



def test_get_indexes_of_parent(client):
    id = index1_1_1.id
    response = client.get('/api/codification-indexes/{}/children/'.format(id))
    assert response.status_code == 200
    assert response.content_type == 'application/json'
    
    
    data = json.loads(response.data)
    assert index1_1_1_1.to_dict() in data
    assert index1_1_1_2.to_dict() in data