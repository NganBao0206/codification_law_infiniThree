import json
import re


chuDeJD = []
# Đọc file
with open('data/chuDe.js') as dataFile:
    data = dataFile.read()
    obj = data[data.find('{') : data.rfind('}')+1]
    jsonObj = json.loads('[' + obj + ']')
    chuDeJD = jsonObj
  
finalChuDe = {}

for chuDe in chuDeJD:
    finalChuDe[chuDe.get('Value')] = chuDe


deMucJD = []


with open('data/deMuc.js') as dataFile:
    data = dataFile.read()
    obj = data[data.find('{') : data.rfind('}')+1]
    jsonObj = json.loads('[' + obj + ']')
    deMucJD = jsonObj
    
finalDeMuc = {}

for deMuc in deMucJD:
    finalDeMuc[deMuc.get('Value')] = deMuc
    
conJD = []
with open('data/con.js') as dataFile:
    data = dataFile.read()
    obj = data[data.find('{') : data.rfind('}')+1]
    jsonObj = json.loads('[' + obj + ']')
    conJD = jsonObj
    

for con in conJD:
    if finalDeMuc.get(con.get('DeMucID')).get('children') == None:
        finalDeMuc.get(con.get('DeMucID'))['children'] = []
    
    finalDeMuc.get(con.get('DeMucID')).get('children').append(con)
    
    


index = {
    'Phần': 0,
    'Chương': 1,
    'Mục': 2,
    'Tiểu': 3,
    'Điều': 4,
}

resultFinal = []


for de in finalDeMuc: 
    listChild = finalDeMuc.get(de).get('children')
    if listChild:
        stack = []
        for item in listChild:
            str = item.get('TEN').split(' ')[0]
            order = index[str]
            
            node = {'index': order, 'value': item,'children': []}
            
            
            if len(stack) == 0:
                stack.append(node)
            else: 
                obj = stack
                while True:
                    if len(obj) == 0:
                        obj.append(node)
                        break
                    if obj[-1].get('index') >= node.get('index'):
                        obj.append(node)
                        break
                    else:
                        if not obj[-1].get('children'):
                            obj[-1]['children'] = []
                        obj = obj[-1].get('children')
                        
        finalDeMuc.get(de).pop('children', None)
        finalDeMuc.get(de)['children'] = stack



for de in finalDeMuc:
    if finalChuDe.get(finalDeMuc.get(de).get('ChuDe')).get('children') == None:
        finalChuDe.get(finalDeMuc.get(de).get('ChuDe'))['children'] = []
    finalChuDe.get(finalDeMuc.get(de).get('ChuDe'))['children'].append(finalDeMuc.get(de))
    

dataObj = finalChuDe

with open('output.json', 'w') as f:
    json.dump(dataObj, f)