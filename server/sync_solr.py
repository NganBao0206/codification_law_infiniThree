import pysolr
from server_app import db, solr, app
from models import *
from sqlalchemy import inspect
from enum import Enum

if __name__ == '__main__':
    with app.app_context():
        # Lấy danh sách tất cả các bảng trong cơ sở dữ liệu
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()

        # Đánh chỉ mục dữ liệu từ mỗi bảng lên Solr
        for table in tables:
            if table in db.Model.metadata.tables:
                rows = db.session.query(db.Model.metadata.tables[table]).all()
                for row in rows:
                    doc = {f"{table}_{i}": value.isoformat() if isinstance(value, datetime) else str(value) for i, value in enumerate(row)}
                    solr.add([doc])