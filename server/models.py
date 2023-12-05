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
        result = {}
        for key in self.__mapper__.c.keys():
            attr = getattr(self, key)
            if isinstance(attr, db.Model):
                result[key] = attr.to_dict()
            elif isinstance(attr, list):
                result[key] = [item.to_dict() for item in attr]
            elif isinstance(attr, Enum):
                result[key] = attr.name
            else:
                result[key] = attr
        for key, value in self.__dict__.items():
            if isinstance(value, db.Model):
                result[key] = value.to_dict()
        return result


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
    rooms = relationship('ChatRoom', back_populates='user', lazy=True)
    
    def __str__(self):
        return self.name
    

class CodificationTopic(BaseModel):
    __tablename__ = 'codification_topic'
    id = Column(String(100), primary_key=True)
    name = Column(String(500), nullable=False)
    order = Column(Integer, nullable=False)
    
    sub_topics = relationship('CodificationSubTopic', back_populates="topic", lazy=True)
    
    def __str__(self):
        return self.name


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
    topic = relationship(CodificationTopic, back_populates="sub_topics", uselist=False, lazy=False)
    codification_indexes = relationship('CodificationIndex', backref=backref('sub_topic', lazy=False, uselist=False), lazy=True)

    legal_documents = relationship('LegalDocument', backref=backref('sub_topic', lazy=False, uselist=False), lazy=True)



class LegalDocument(BaseModel):
    __tablename__ = 'legal_document'
    id = Column(String(100), primary_key=True)
    order = Column(Integer, nullable=False)
    name = Column(String(500), nullable=False)
    link = Column(String(500), nullable=False) 
    agency = Column(String(50), nullable=True)
    issued_date = Column(DateTime, nullable=False)
    effective_date = Column(DateTime, nullable=False)
    symbols = Column(String(20), nullable=False) 
    sub_topic_id = Column(String(100), ForeignKey(CodificationSubTopic.id), nullable=False)


    
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
    
    

class ChatRoom(BaseModel):
    __tablename__ = 'chat_room'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    name = Column(String(100), nullable=True)
    messages = relationship('Message', backref=backref('chat_room', lazy=True, uselist=False), uselist=True, lazy=True)
    user = relationship('User', back_populates='rooms', lazy=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
 
 
class Message(BaseModel):
    __tablename__ = 'message'
    id = Column(Integer, primary_key=True, autoincrement=True)
    chat_room_id = Column(Integer, ForeignKey(ChatRoom.id), nullable=False)
    content = Column(String(100), nullable=True)
    is_user_message = Column(Boolean, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    

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
    
    
    
class Question(BaseModel):
    _tablename_ = 'question'
    _table_args_ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(Text)
    description = Column(Text)
    topic_id = Column(String(255), ForeignKey(CodificationTopic.id))
    user_id = Column(Integer, ForeignKey(User.id))
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    topic = relationship(CodificationTopic, backref='questions', lazy=False)
    user = relationship(User, backref='questions', lazy=False)
    def __str__(self):
        return str(self.title)
    


class Reply(BaseModel):
    _tablename_ = 'reply'
    _table_args_ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(Text)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    question_id = Column(Integer, ForeignKey(Question.id))
    user_id = Column(Integer, ForeignKey(User.id))
    user = relationship(User, backref='replies', lazy=True)
    question = relationship(Question, backref='replies', lazy=True)
    def __str__(self):
        return str(self.content)
    
    
    
    
    
    
#     from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# import pysolr

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/db'
# db = SQLAlchemy(app)
# solr = pysolr.Solr('http://localhost:8983/solr/my_index', timeout=10)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def __repr__(self):
#         return '<User %r>' % self.username

#     @staticmethod
#     def after_insert(mapper, connection, target):
#         solr.add([target.__dict__])

#     @staticmethod
#     def after_update(mapper, connection, target):
#         solr.add([target.__dict__])

#     @staticmethod
#     def after_delete(mapper, connection, target):
#         solr.delete(id=target.id)

# db.event.listen(User, 'after_insert', User.after_insert)
# db.event.listen(User, 'after_update', User.after_update)
# db.event.listen(User, 'after_delete', User.after_delete)
