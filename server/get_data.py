from server_app import app, db
from models import *
from server_app.dao.codification_sub_topic_dao import *
a = [
    {
        "order": "1",
        "name": "Luật 24/2018/QH14 An ninh mạng",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=132957",
        "agency": "Bộ Công an",
        "issued_date": "12/06/2018",
        "effective_date": "01/01/2019",
        "symbols": ""
    },
    {
        "order": "2",
        "name": "Nghị định 13/2023/NĐ-CP Bảo vệ dữ liệu cá nhân",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=161106",
        "agency": "Bộ Công an",
        "issued_date": "17/04/2023",
        "effective_date": "01/07/2023",
        "symbols": "NĐ.1"
    }
]

from sqlalchemy import MetaData, Table

metadata = MetaData()
import uuid

# Tạo một UUID ngẫu nhiên dựa trên thuật toán MD5

if __name__ == '__main__':
    with app.app_context():
        legal_document_table = Table('legal_document', metadata, autoload_with=db.engine)
        legal_document_table.drop(db.engine)
        db.create_all()
        uuid_object = uuid.uuid4()

        uuid_string = str(uuid_object)
        lg1 = LegalDocument(id=uuid_string, order=a[0].get('order'), name=a[0].get('name'), link=a[0].get('link'), agency=a[0].get('agency'), symbols=a[0].get('symbols'),
                            issued_date=datetime.strptime(a[0].get('issued_date'), "%d/%m/%Y"),
                            effective_date=datetime.strptime(a[0].get('effective_date'), "%d/%m/%Y"), sub_topic_id='1fd42d83-9d78-4dd4-b6b6-73e9bd3472e1')
        uuid_object = uuid.uuid4()

        uuid_string = str(uuid_object)

        lg2 = LegalDocument(id=uuid_string, order=a[1].get('order'), name=a[1].get('name'), link=a[1].get('link'), agency=a[1].get('agency'), symbols=a[1].get('symbols'),
                            issued_date=datetime.strptime(a[1].get('issued_date'), "%d/%m/%Y"),
                            effective_date=datetime.strptime(a[1].get('effective_date'), "%d/%m/%Y"), sub_topic_id='1fd42d83-9d78-4dd4-b6b6-73e9bd3472e1')
        
        db.session.add_all([lg1, lg2])
        db.session.commit()
        

