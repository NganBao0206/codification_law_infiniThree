from server_app import app, db
from models import *
from data_process import dataObj

if __name__ == '__main__':
    with app.app_context():
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
            cd = CodificationTopic(id=topic.get('Value'), name=topic.get('Text'), order=topic.get('STT'))
            listAll.append(cd)
            for deMuc in topic.get('children'):
                dm = CodificationSubTopic(id=deMuc.get('Value'), name=deMuc.get('Text'), order=deMuc.get('STT'), topic=cd)
                if deMuc.get('children'):
                    for loop, items  in enumerate(deMuc.get('children')):
                        type = index.get(items.get('index'))
                        value = items.get('value')
                        cm = CodificationIndex(id=value.get('ID') , name=value.get('TEN'), order=loop+1, map_index=value.get('MAPC'), sub_topic=dm, index_type=type)
                        
                        if items.get('children'):
                            obj = items
                            objData = cm
                            while len(obj.get('children')) > 0:
                                for loop, item in enumerate(obj.get('children')):
                                    type = index.get(item.get('index'))
                                    value = item.get('value')
                                    cmCo = CodificationIndex(id=value.get('ID'), name=value.get('TEN'), order=loop+1, map_index=value.get('MAPC'), sub_topic=dm, index_type=type, parent=objData)
                                obj = item
                                objData = cmCo                                

                                    
                            
        db.session.add_all(listAll)
        db.session.commit()