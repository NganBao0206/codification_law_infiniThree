from sqlalchemy import Column, Integer, String, ForeignKey, Table, ForeignKeyConstraint, Text
from sqlalchemy.orm import relationship, backref
from server_app import db
from enum import Enum
from sqlalchemy.inspection import inspect



codification_sub_topic_index = db.Table('codification_sub_topic_index',
    Column('id', Integer, ForeignKey('codification_index.id'), primary_key=True),
    Column('sub_topic_id', Integer, ForeignKey('codification_sub_topic.id')),
)


codification_index_parent = db.Table('codification_index_parent',
    Column('id', Integer, primary_key=True),
    Column('index_parent_id', Integer),
    ForeignKeyConstraint(['id'], ['codification_index.id']),
    ForeignKeyConstraint(['index_parent_id'], ['codification_index.id'])
)

class IndexType(Enum):
    Phan = 'Phần'
    Chuong = 'Chương'
    Muc = 'Mục'
    TieuMuc = 'Tiểu mục'
    Dieu = 'Điều'
    
class DocumentType(Enum):
    LQ = 'Luật'
    ND = 'Nghị Định'
    TT = 'Thông Tư'
    QD = 'Quyết Định'
    
class BaseModel(db.Model):
    __abstract__ = True
    def to_dict(self):
        return {c.key: getattr(self, c.key).name if isinstance(getattr(self, c.key), Enum) else getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class CodificationTopic(BaseModel):
    __tablename__ = 'codification_topic'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    
    sub_topics = relationship('CodificationSubTopic', backref=backref('topic', lazy=False), lazy=True)


class CodificationSubTopic(BaseModel):
    __tablename__ = 'codification_sub_topic'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    
    topic_id = Column(Integer, ForeignKey(CodificationTopic.id), nullable=False)

    codification_indexes = relationship('CodificationIndex', secondary=codification_sub_topic_index, backref=backref('sub_topic', uselist=False, lazy=False), lazy=True)

    
class CodificationIndex(BaseModel):
    __tablename__ = 'codification_index'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, nullable=False)
    order = Column(Integer, nullable=False)
    index_type = Column(db.Enum(IndexType), nullable=False)
    children = relationship('CodificationIndex',
                            secondary=codification_index_parent,
                            primaryjoin=id==codification_index_parent.c.index_parent_id,
                            secondaryjoin=id==codification_index_parent.c.id,
                            backref=backref('parent', uselist=False), lazy=True)    
    
    legal_document_indexes = relationship('LegalDocumentIndex', backref=backref('codification_index', uselist=False), uselist=False, lazy=False)


class LegalDocument(BaseModel):
    __tablename__ = 'legal_document'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(500), nullable=False)
    document_type = Column(db.Enum(DocumentType), nullable=False)
    item_id = Column(String(20), nullable=False)
    
    legal_indexes = relationship('LegalDocumentIndex', backref=backref('legal_document', lazy=False), lazy=True)
    
    
class LegalDocumentIndex(BaseModel):
    __tablename__ = 'legal_document_index'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    codification_index_id = Column(Integer, ForeignKey(CodificationIndex.id), nullable=True)
    legal_document_id = Column(Integer, ForeignKey(LegalDocument.id), nullable=True)


    
    
    
    