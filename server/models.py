from sqlalchemy import Column, Integer, String, ForeignKey, Table, ForeignKeyConstraint, Text, Boolean, DateTime
from sqlalchemy.orm import relationship, backref
from server_app import db
from enum import Enum
from sqlalchemy.inspection import inspect
from datetime import datetime




    

codification_index_parent = db.Table('codification_index_parent',
    Column('id', String(100), primary_key=True),
    Column('index_parent_id', String(100)),
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

class UserRole(Enum):
    ADMIN = 1
    USER = 2

class User(BaseModel):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    username = Column(String(50), unique=True)
    password = Column(String(100))
    email = Column(String(100), unique=True)
    avatar = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(db.Enum(UserRole), default=UserRole.USER)

    def __str__(self):
        return self.name
    

class CodificationTopic(BaseModel):
    __tablename__ = 'codification_topic'
    id = Column(String(100), primary_key=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    
    sub_topics = relationship('CodificationSubTopic', backref=backref('topic', lazy=False), lazy=True)


codification_sub_topic_index = db.Table('codification_sub_topic_index',
    Column('id', String(100), ForeignKey('codification_index.id'), primary_key=True),
    Column('sub_topic_id', String(100), ForeignKey('codification_sub_topic.id')),
)


class CodificationSubTopic(BaseModel):
    __tablename__ = 'codification_sub_topic'
    id = Column(String(100), primary_key=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    
    topic_id = Column(String(100), ForeignKey(CodificationTopic.id), nullable=False)
    
    codification_indexes = relationship('CodificationIndex', backref=backref('sub_topic', lazy=False, uselist=False), lazy=True)
        
    
class CodificationIndex(BaseModel):
    __tablename__ = 'codification_index'
    id = Column(String(100), primary_key=True)
    name = Column(Text, nullable=False)
    order = Column(Integer, nullable=False)
    index_type = Column(db.Enum(IndexType), nullable=False)
    map_index = Column(String(300), nullable=False)
    children = relationship('CodificationIndex',
                            secondary=codification_index_parent,
                            primaryjoin=id==codification_index_parent.c.index_parent_id,
                            secondaryjoin=id==codification_index_parent.c.id,
                            back_populates='parent', lazy=True)    

    parent = relationship('CodificationIndex',
                            secondary=codification_index_parent,
                            primaryjoin=id==codification_index_parent.c.id,
                            secondaryjoin=id==codification_index_parent.c.index_parent_id,
                            back_populates='children',uselist=False, lazy=True)    
    
    sub_topic_id = Column(String(100), ForeignKey(CodificationSubTopic.id), nullable=False)
    
    # legal_document_indexes = relationship('LegalDocumentIndex', backref=backref('codification_index', uselist=False), uselist=False, lazy=False)


# class LegalDocument(BaseModel):
#     __tablename__ = 'legal_document'
#     id = Column(String(100), primary_key=True)
#     name = Column(String(500), nullable=False)
#     document_type = Column(db.Enum(DocumentType), nullable=False)    
#     legal_indexes = relationship('LegalDocumentIndex', backref=backref('legal_document', lazy=False), lazy=True)
    
    
# class LegalDocumentIndex(BaseModel):
#     __tablename__ = 'legal_document_index'
#     id = Column(String(100), primary_key=True)
#     name = Column(String(500), nullable=False)
#     order = Column(Integer, nullable=False)
#     codification_index_id = Column(String(100), ForeignKey(CodificationIndex.id), nullable=True)
#     legal_document_id = Column(String(100), ForeignKey(LegalDocument.id), nullable=True)


    

class Terminology(BaseModel):
    __tablename__ = 'terminology'
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    value = Column(Text)
    description = Column(Text)
    source = Column(Text)
    link = Column(Text)
    province = Column(String(255))


    def __str__(self):
        return str(self.value)
    
    