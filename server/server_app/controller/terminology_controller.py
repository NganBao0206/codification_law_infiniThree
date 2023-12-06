from flask import jsonify, request
from server_app.dao import terminology_dao
import math
from config import PER_PAGE
# from config import vncorenlp
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
    for row in data_terminologies.iloc:
        if row['thuatngu']:
            if is_existed(row['thuatngu'].lower().strip(), paragraph):
                words.append({'word': row['thuatngu'], 'mean': row['mota']})
        print("err")
                
    return jsonify(words), 200



# def search_terminology_form_paragraph():
#     paragraph = request.json.get("paragraph", None)
#     if paragraph.strip() is None:
#         return jsonify({"msg": "empty"}), 204
    
#     nouns = get_nouns(paragraph)

#     file_path = os.path.join(app.root_path, 'data_terminologies', 'full_thuat_ngu_procesing_v3.csv')
#     data_terminologies = pd.read_csv(file_path)
    

#     existed_nouns_with_description = []
#     non_existed_nouns = []
#     for n in nouns:
#         if n.lower().strip() in terminology_dict:
#             existed_nouns_with_description.append({'word': n, 'mean': terminology_dict[n.lower().strip()]})
#         else:
#             non_existed_nouns.append(n)

#     all_sentences = paragraph.split('.')
#     find_data = find_sentence_with_word(all_sentences, non_existed_nouns)
    
    
#     return jsonify(existed_nouns_with_description), 200

    
    

def is_existed(w, nouns_list):
    if (w in nouns_list):
        return True
    return False


# def get_nouns(sentence):
#     nouns = []
#     annotated_sentence = vncorenlp.annotate_text(sentence)
#     for i in range(len(annotated_sentence)):
#         for word_info in annotated_sentence[i]:
#             pos_tag = word_info['posTag']
#             if pos_tag.startswith('N'):
#                 nouns.append((word_info['wordForm']).replace("_", " "))
#     nouns =  list(set(nouns))
    
#     return nouns


# def find_sentence_with_word(sentences, words):
#     result_words = []
#     result_sentenecs = []
#     for word in words:
#         for s in sentences:
#             if word.s.strip().lower() in s.strip().lower():
#                 result_words.append(word)
#                 result_sentenecs.append(s)
#     return pd.DataFrame({'word' : result_words,
#                         'sentence': result_sentenecs})


# def check_at_start_of_sentence(word, sentence):
#     if sentence.startswith(word):
#         return 1
#     return 0
