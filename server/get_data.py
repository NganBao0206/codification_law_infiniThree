from server_app import app, db
from models import *
from server_app.dao.codification_sub_topic_dao import *
a = [
    {
        "name": "Luật 24/2018/QH14 An ninh mạng",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=132957",
        "agency": "Bộ Công an",
        "issued_date": "12/06/2018",
        "effective_date": "01/01/2019",
        "symbols": "",
        "sub_topic_id": "1fd42d83-9d78-4dd4-b6b6-73e9bd3472e1"
    },
    {
        "name": "Nghị định 13/2023/NĐ-CP Bảo vệ dữ liệu cá nhân",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=161106",
        "agency": "Bộ Công an",
        "issued_date": "17/04/2023",
        "effective_date": "01/07/2023",
        "symbols": "NĐ.1",
        "sub_topic_id": "1fd42d83-9d78-4dd4-b6b6-73e9bd3472e1"
    },
    {
        "name": "Luật 32/2004/QH11 An ninh Quốc gia",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=18562",
        "agency": "",
        "issued_date": "03/12/2004",
        "effective_date": "01/07/2005",
        "symbols": "",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 16/2006/NĐ-CP Quy định về việc khôi phục danh dự, đền bù, trợ cấp cho cơ quan, tổ chức, cá nhân bị thiệt hại do tham gia bảo vệ an ninh quốc gia",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=16787",
        "agency": "",
        "issued_date": "25/01/2006",
        "effective_date": "22/02/2006",
        "symbols": "NĐ.1",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 38/2006/NĐ-CP Về Bảo vệ dân phố",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=16319",
        "agency": "",
        "issued_date": "17/04/2006",
        "effective_date": "15/05/2006",
        "symbols": "NĐ.2",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 127/2006/NĐ-CP Quy định về bảo đảm điều kiện cho hoạt động bảo vệ an ninh quốc gia và giữ gìn trật tự, an toàn xã hội",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=15036",
        "agency": "",
        "issued_date": "27/10/2006",
        "effective_date": "27/11/2006",
        "symbols": "NĐ.3",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 35/2011/NĐ-CP  Về biện pháp pháp luật bảo vệ an ninh quốc gia, giữ gìn trật tự, an toàn xã hội",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=26429",
        "agency": "",
        "issued_date": "18/05/2011",
        "effective_date": "10/07/2011",
        "symbols": "NĐ.4",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 06/2013/NĐ-CP Quy định về bảo vệ cơ quan, doanh nghiệp",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=32523",
        "agency": "",
        "issued_date": "09/01/2013",
        "effective_date": "01/03/2013",
        "symbols": "NĐ.5",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Nghị định 06/2014/NĐ-CP Về biện pháp vận động quần chúng bảo vệ an ninh quốc gia, giữ gìn trật tự, an toàn xã hội",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=33421",
        "agency": "",
        "issued_date": "21/01/2014",
        "effective_date": "08/03/2014",
        "symbols": "NĐ.6",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Thông tư liên tịch 02/2007/TTLT-BCA-BLĐTBXH-BTC Hướng dẫn thực hiện Nghị định số 38/2006/NĐ-CP ngày 17/04/2006 của Chính phủ về Bảo vệ dân phố",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=14002",
        "agency": "",
        "issued_date": "01/03/2007",
        "effective_date": "25/04/2007",
        "symbols": "TL.1",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Thông tư 46/2014/TT-BCA Quy định chi tiết một số điều của Nghị định số 06/2013/NĐ-CP ngày 09 tháng 01 năm 2013 quy định về bảo vệ cơ quan, doanh nghiệp",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=122418",
        "agency": "Bộ Công an",
        "issued_date": "16/10/2014",
        "effective_date": "06/12/2014",
        "symbols": "TT.1",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Thông tư 08/2016/TT-BCA Quy định trang phục cho lực lượng bảo vệ cơ quan, doanh nghiệp",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=98721",
        "agency": "Bộ Công an",
        "issued_date": "06/02/2016",
        "effective_date": "05/04/2016",
        "symbols": "TT.2",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Thông tư liên tịch 02/2016/TTLT-BVHTTDL-BCA Hướng dẫn phối hợp công tác bảo vệ an ninh quốc gia và bảo đảm trật tự, an toàn xã hội trong lĩnh vực văn hóa, gia đình, thể dục, thể thao và du lịch",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=122694",
        "agency": "",
        "issued_date": "04/05/2016",
        "effective_date": "25/06/2016",
        "symbols": "TL.2",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    },
    {
        "name": "Thông tư liên tịch 85/2016/TTLT-BTC-BCA Quy định về phối hợp công tác bảo vệ an ninh quốc gia và bảo đảm trật tự, an toàn xã hội trong lĩnh vực tài chính",
        "link": "http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=111142",
        "agency": "",
        "issued_date": "20/06/2016",
        "effective_date": "05/08/2016",
        "symbols": "TL.3",
        "sub_topic_id": "55323c64-e78f-4537-afcd-6a3c2af3c71d"
    }
]

from sqlalchemy import MetaData, Table

metadata = MetaData()
import uuid

# Tạo một UUID ngẫu nhiên dựa trên thuật toán MD5

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        for data in a:
            lg = LegalDocument(name=data.get('name'), link=data.get('link'), agency=data.get('agency'), symbols=data.get('symbols'),
                                issued_date=datetime.strptime(data.get('issued_date'), "%d/%m/%Y"),
                                effective_date=datetime.strptime(data.get('effective_date'), "%d/%m/%Y"), sub_topic_id=data.get('sub_topic_id'))
            db.session.add(lg)
        db.session.commit()
        

