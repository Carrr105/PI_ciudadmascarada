from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'CMascarada'
app.config['MONGO_URI'] = 'mongodb+srv://user123:proyectointegrador@cm.lgptm.mongodb.net/CMascarada?retryWrites=true&w=majority'
app.config['JWT_SECRET_KEY'] = "secret"

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = mongo.db.Usuario
CORS(app)


@app.route('/hist', methods=['GET'])
def getHist():
    hist = []
    for doc in db.find():
        hist.append({
            'userid': request.json['userid'],
            'titulo': request.json['titulo'],
            'descripcion': request.json['descripcion'],
            'valvar': request.json['valvar'],
            'nombrevar': request.json['valvar'],
            'first node': request.json['first node']
        })
    return jsonify(hist)

#######################################
@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'usuario': doc['usuario'],
            'email': doc['email'],
            'password': doc['password'],
        })
    return jsonify(users)





@app.route('/users/register', methods=["POST"])
def register():
    users = mongo.db.Usuario
    usuario = request.get_json()['usuario']
    email = request.get_json()['email']
    password = request.get_json()['email']
    print("hi","\n")
    user_id = users.insert_one({
        'usuario': usuario,
        'email': email,
        'password': password,
    }).inserted_id
    print("hi","\n")
    new_user = users.find_one({'_id': user_id})

    result = {'email': new_user['email'] + ' registered'}

    return jsonify({'result' : result})

@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.Usuario
    usuario = request.get_json()['usuario']
    password = request.get_json()['password']
    result = ""
    response = users.find_one({'usuario': usuario})
    if response:
        if response['password']:
            access_token = create_access_token(identity = {
                'usuario': response['usuario'],
                'password': response['password']
            })
            result = jsonify({'token':access_token})
            print(access_token)
        else:
            exit;
            result = jsonify({"error":"Invalid username and password"})
    else:
        result = jsonify({"result":"No results found"})
    return result

if __name__ == '__main__':
    app.run(debug=True)
