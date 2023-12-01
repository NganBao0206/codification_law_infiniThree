from flask import jsonify, request
from server_app.dao import terminology_dao
import math
from config import PER_PAGE
import pandas as pd
import os 
from server_app import app

def get_terminology():
    kw = request.args.get('kw', default=None, type=str)
    page = request.args.get('page', default=1, type=int)

    results = terminology_dao.get_terminology(kw, page)
    count = terminology_dao.count_terminology(kw)
    total_pages = math.ceil(count / PER_PAGE)

    reponse = jsonify ({
        "total_pages": total_pages,
        "total_terminologies": count,
        "terminologies": [result.to_dict() for result in results]
    })
    
    return reponse, 200


def search_terminology_form_paragraph():
    paragraph = request.json.get("paragraph", None)
    if paragraph is None:
        return jsonify({"msg": "empty"}), 204
    file_path = os.path.join(app.root_path, 'data_terminologies', 'full_thuat_ngu_procesing_v3.csv')
    data_terminologies = pd.read_csv(file_path)
    words = []
    for x in data_terminologies.iloc:
        try: 
            if x['thuatngu']:
                rs = is_in(x['thuatngu'].lower().strip(), paragraph)
                if rs != -1:
                    words.append({'word': x['thuatngu'], 'mean': x['mota']})
        except:
            print("err")
                
    
    return jsonify(words), 200
    
    

def is_in(x, paragraph):
    if (x in paragraph):
        return x
    return -1