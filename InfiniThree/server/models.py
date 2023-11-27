from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Table, ForeignKeyConstraint
from sqlalchemy.orm import relationship, backref

from sqlalchemy.ext.declarative import declarative_base
from server_app import db, app
from enum import Enum




codification_sub_topic_index = db.Table('codification_sub_topic_index',
    db.Column('id', db.Integer, db.ForeignKey('codification_index.id'), primary_key=True),
    db.Column('topic_id', db.Integer, db.ForeignKey('codification_sub_topic.id')),
)


codification_index_parent = db.Table('codification_index_parent',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('index_parent_id', db.Integer),
    ForeignKeyConstraint(['id'], ['codification_index.id']),
    ForeignKeyConstraint(['index_parent_id'], ['codification_index.id'])
)

class IndexType(Enum):
    LQ = 'Luật'
    ND = 'Nghị Định'
    TT = 'Thông Tư'
    QD = 'Quyết Định'
    
class IndexType(Enum):
    LQ = 'Luật'
    ND = 'Nghị Định'
    TT = 'Thông Tư'
    QD = 'Quyết Định'

class CodificationTopic(db.Model):
    __tablename__ = 'codification_topic'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    order = Column(Integer, nullable=False)
    
    sub_topics = relationship('CodificationSubTopic', backref='topic', lazy=True)


class CodificationSubTopic(db.Model):
    __tablename__ = 'codification_sub_topic'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    order = Column(Integer, nullable=False)
    
    topic_id = Column(Integer, ForeignKey(CodificationTopic.id), nullable=False)

    indexes = relationship('CodificationIndex', secondary=codification_sub_topic_index, backref=backref('sub_topic', uselist=False), lazy=True)

    
class CodificationIndex(db.Model):
    __tablename__ = 'codification_index'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    order = Column(Integer, nullable=False)
    index_type = Column(db.Enum(IndexType), nullable=False)
    children = relationship('CodificationIndex',
                            secondary=codification_index_parent,
                            primaryjoin=id==codification_index_parent.c.index_parent_id,
                            secondaryjoin=id==codification_index_parent.c.id,
                            backref=backref('parent', uselist=False), lazy=True)    
    

    
    
if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        topic = CodificationTopic(name="test", order=1)
        sub_topic = CodificationSubTopic(name="testsub", order=1, topic=topic)
        
        index = CodificationIndex(name="testindex", order=1, index_type=IndexType.LQ)
        index2 = CodificationIndex(name="child", order=1, index_type=IndexType.ND)
        index.children.append(index2)
        sub_topic.indexes.append(index)
        db.session.add_all([topic, sub_topic, index])
        db.session.commit()