from flask import jsonify, request
from server_app.dao import chat_room_message_dao
from server_app.dao.legal_document_dao import get_legal_document_by_link

from flask_jwt_extended import jwt_required, current_user
from server_app import app, embeddings
import os 
from langchain.text_splitter import CharacterTextSplitter
from pyvi import ViTokenizer
import requests
from langchain.vectorstores import Chroma


# text_splitter = RecursiveCharacterTextSplitter(
#     # Set a really small chunk size, just to show.
#     chunk_size = 512,
#     chunk_overlap  = 200,
#     length_function = len,
#     add_start_index = True,
# )

API_URL = "https://api-inference.huggingface.co/models/ShynBui/vie_qa"
headers = {"Authorization": "Bearer " + os.getenv('TOKEN_HUGGING_FACE')}


def split_with_source(text, source):
    splitter = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 1200,
        chunk_overlap  = 240,
        length_function = len,
        add_start_index = True,
    )
    documents = splitter.create_documents([text])
    for doc in documents:
        doc.metadata["source"] = source
    return documents
    
    

# [GET] - /api/chat-bot/rooms/<room_id>/
@jwt_required()
def get_msg(room_id):
    room = chat_room_message_dao.get_chat_room_by_id(room_id)
    if room is not None and room.user_id == current_user.id:
        return jsonify([m.to_dict() for m in room.messages])
    else:
        return jsonify({'msg': "not found"}), 404


# [GET] - /api/chat-bot/rooms/
@jwt_required()
def get_rooms():
    rooms = chat_room_message_dao.get_chat_room_of_user(current_user.id)
    return jsonify([r.to_dict() for r in rooms])
    
    
# [POST] - /api/chat-bot/
@jwt_required()
def send_msg():
    msg = request.json.get("msg")
    sub_topic_id = request.json.get("sub_topic_id")
    chat_room_id = request.json.get("room_id", None)
    folder_path = os.path.join(app.root_path, 'data', sub_topic_id)

    if msg and not msg.endswith('?'):
        msg += '?'
    
    if os.path.exists(folder_path):
        my_chroma_db = Chroma(persist_directory=(folder_path), embedding_function=embeddings)
        retriever = my_chroma_db.as_retriever(search_type="mmr")
        
        
        docs = retriever.get_relevant_documents(msg)
        result = []
        
        import time
        for i in docs:
            context = ViTokenizer.tokenize(i.page_content)
            question = ViTokenizer.tokenize(msg)
            output = query({
            "inputs": {
                "question": question,
                "context": context
            },
            })
            
            step = 0
            while "error" in output and step < 20:
                print('fail')
                time.sleep(1)
                step += 1
                output = query({
                "inputs": {
                    "question": question,
                    "context": context
                },
                })
            
            if (step >= 20 and "error" in output):
                continue
                
            result.append({
                'answer': output['answer'],
                'scores': output['score'],
                'sources': i.metadata['source']
            })
        
        best_answer = {}
        for r in result:
            if not best_answer:
                best_answer = r
            elif r.get('scores') > best_answer.get('scores'):
                    best_answer = r
                                         
        if best_answer:
            if chat_room_id is None:
                room = chat_room_message_dao.add_chat_room(name=msg, user=current_user)
                chat_room_id = room.id
            
            source = get_legal_document_by_link(best_answer.get('sources'))

            user_message = chat_room_message_dao.add_message(chat_room_id=room.id, content=msg, is_user_message=True)
            bot_message = chat_room_message_dao.add_message(chat_room_id=room.id, content=best_answer.get('answer'), is_user_message=False, source=source)
            
            return jsonify({'bot_msg': bot_message.to_dict(), 'source': best_answer.get('sources')}), 200
    return jsonify({}), 404

        
        
def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
