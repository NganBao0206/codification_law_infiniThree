from server_app import db
from models import LegalDocument

def get_legal_document_by_id(doc_id):
    return db.session.query(LegalDocument).filter(LegalDocument.id.__eq__(doc_id)).first()


def get_legal_document_by_link(link):
    return db.session.query(LegalDocument).filter(LegalDocument.link.__eq__(link)).first()


def get_legal_document_by_sub_topic_id(sub_topic_id):
    return db.session.query(LegalDocument).filter(LegalDocument.sub_topic_id.__eq__(sub_topic_id)).all()

    