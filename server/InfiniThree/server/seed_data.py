from server_app import app, db
from models import *
from data_process import dataObj

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        
        index = {
            0 : IndexType.Phan,
            1 : IndexType.Chuong,
            2 : IndexType.Muc,
            3 : IndexType.TieuMuc,
            4 : IndexType.Dieu,
        }
        
        listAll = []
        for chuDe in dataObj:
            topic = dataObj.get(chuDe)
            cd = CodificationTopic(name=topic.get('Text'), order=topic.get('STT'))
            listAll.append(cd)
            for deMuc in topic.get('children'):
                dm = CodificationSubTopic(name=deMuc.get('Text'), order=deMuc.get('STT'), topic=cd)
                if deMuc.get('children'):
                    for loop, items  in enumerate(deMuc.get('children')):
                        type = index.get(items.get('index'))
                        value = items.get('value')
                        cm = CodificationIndex(name=value.get('TEN'), order=loop+1, sub_topic=dm, index_type=type)
                        
                        if items.get('children'):
                            obj = items
                            objData = cm
                            while len(obj.get('children')) > 0:
                                for loop, item in enumerate(obj.get('children')):
                                    type = index.get(item.get('index'))
                                    value = item.get('value')
                                    cmCo = CodificationIndex(name=value.get('TEN'), order=loop+1, index_type=type, parent=objData)
                                obj = item
                                objData = cmCo                                

                                    
                            
                                
        # topic = CodificationTopic(name="test", order=1)
        # sub_topic = CodificationSubTopic(name="testsub", order=1, topic=topic)
        
        # index = CodificationIndex(name="testindex", order=1, index_type=IndexType.Chuong)
        # index2 = CodificationIndex(name="child", order=1, index_type=IndexType.Dieu)
        # index.children.append(index2)
        # sub_topic.codification_indexes.append(index)
        db.session.add_all(listAll)
        db.session.commit()