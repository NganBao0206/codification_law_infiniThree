import chromadb
from flask import jsonify, request
from server_app.dao.codification_index_dao import get_indexes_of_sub_topic
from flask_jwt_extended import jwt_required, current_user
from server_app import app, embeddings
import os 
from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from pyvi import ViTokenizer, ViPosTagger
from langchain.retrievers import BM25Retriever, EnsembleRetriever
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



# [POST] - /api/chat-bot/
# @jwt_required()
def send_msg():
    # msg = request.json.get("msg")
    # sub_topic_id = request.json.get("sub_topic_id")
    # chat_room_id = request.json.get("room_id")
    sub_topic_id = '1fd42d83-9d78-4dd4-b6b6-73e9bd3472e1'
    file_path = os.path.join(app.root_path, 'data', sub_topic_id)

    if os.path.exists(file_path):
        documents = [Document(page_content="", metadata={'source': 0})]
        files = os.listdir(file_path)
        for file in files:
            full_path = os.path.join(file_path, file)
            print(file)
            if os.path.isfile(full_path):
                with open(full_path, 'r') as f:
                    content = f.read().replace('\n\n', "\n")
                    texts = split_with_source(content, file)
                    documents = documents +texts
        retriever = Chroma.from_documents(documents, embedding=embeddings).as_retriever(
            search_kwargs={"k": 5}
        )
        bm25_retriever = BM25Retriever.from_documents(documents)
        bm25_retriever.k = 5
        ensemble_retriever = EnsembleRetriever(
            retrievers=[bm25_retriever, retriever], weights=[0.5, 0.5]
        )
        docs = ensemble_retriever.get_relevant_documents("Các biện pháp bảo vệ dữ liệu cá nhân là gì?")
        result = []
        
        import time
        for i in docs:
            context = ViTokenizer.tokenize(i.page_content)
            question = ViTokenizer.tokenize("Cơ quan chủ trì có trách nhiệm gì?")
            output = query({
            "inputs": {
                "question": question,
                "context": context
            },
            })
            step = 0  
            while "error" in output and step < 20:
                print('fail')
                step += 1
                time.sleep(1)
                output = query({
                "inputs": {
                    "question": question,
                    "context": context
                },
                })
                
            if "error" not in output:
                if output['score'] >= 0.7:
                    result.append({
                        'answer': output['answer'],
                        'scores': output['score'],
                        'sources': i.metadata['source']
                    })
            print(output, i)
            
        return jsonify(result), 200
    return jsonify({}), 404

        
def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
