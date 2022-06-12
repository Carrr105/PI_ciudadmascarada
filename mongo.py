from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask import send_from_directory

app = Flask(__name__, static_folder="my-app/build", static_url_path='')

app.config['MONGO_DBNAME'] = 'CMascarada'
app.config['MONGO_URI'] = 'mongodb+srv://user123:proyectointegrador@cm.lgptm.mongodb.net/CMascarada?retryWrites=true&w=majority'
app.config['JWT_SECRET_KEY'] = "secret"

class MyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)

app.json_encoder = MyEncoder

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
db = mongo.db.Historia
##########################################################
##### cuadros/historia
#####
@app.route('/api', methods=["GET"])
@cross_origin()
def index():
    return{
    "por favor":"salvame"
    }

@app.route('/api/hist', methods=['GET'])
@cross_origin()
def getHist():
    db = mongo.db.Historia
    hist = []
    for doc in db.find():
        hist.append({
            '_id': doc['_id'],
            'userid': doc['userid'],
            'titulo': doc['titulo'],
            'descripcion': doc['descripcion'],
            'valvar': doc['valvar'],
            'nombrevar': doc['nombrevar'],
            'firstnode': doc['firstnode']
        })
    return jsonify(hist)

@app.route('/api/cuadro/<id>', methods=['GET'])
@cross_origin()
def getIDCuadbyID(id):
    db = mongo.db.Cuadro
    cuadros = []
    for doc in db.find({'histid': id}):
        cuadros.append({
            '_id': str(ObjectId(doc['_id'])),
            'histid': doc['histid'],
            'titulo': doc['titulo'],
            'fathernode': doc['fathernode'],
            'text': doc['text'],
            'KeyVals': doc['KeyVals'],
            'DecisionVals':doc['DecisionVals']
        })
    return jsonify(cuadros)


@app.route('/api/cuadro/x/<id>', methods=['GET'])
@cross_origin()
def getIDCuadbyIDx(id):
    db = mongo.db.Cuadro
    cuadros = []
    for doc in db.find({'_id': ObjectId(id)}):
        cuadros.append({
            '_id': str(ObjectId(doc['_id'])),
            'histid': doc['histid'],
            'titulo': doc['titulo'],
            'fathernode': doc['fathernode'],
            'text': doc['text'],
            'KeyVals': doc['KeyVals'],
            'DecisionVals':doc['DecisionVals']
        })
    return jsonify(cuadros)


@app.route('/api/hist/<id>', methods=['GET'])
@cross_origin()
def getIDHistbyID(id):
    db = mongo.db.Historia
    hist = []
    for doc in db.find({'_id': ObjectId(id)}):
        hist.append({
            '_id': doc['_id'],
            'userid': doc['userid'],
            'titulo': doc['titulo'],
            'descripcion': doc['descripcion'],
            'valvar': doc['valvar'],
            'nombrevar': doc['nombrevar'],
            'firstnode': doc['firstnode']
        })
    return jsonify(hist)


@app.route('/api/hist/user/<id>', methods=['GET'])
@cross_origin()
def getIDHistbyUsertID(id):
    db = mongo.db.Historia
    hist = []
    for doc in db.find({'userid': id}):
        hist.append({
            '_id': doc['_id'],
            'userid': doc['userid'],
            'titulo': doc['titulo'],
            'descripcion': doc['descripcion'],
            'valvar': doc['valvar'],
            'nombrevar': doc['nombrevar'],
            'firstnode': doc['firstnode']
        })
    return jsonify(hist)



@app.route('/api/cuadro', methods=['GET'])
@cross_origin()
def getCuad():
    db = mongo.db.Cuadro
    cuadros = []
    for doc in db.find():
        cuadros.append({
            '_id': str(ObjectId(doc['_id'])),
            'histid': doc['histid'],
            'fathernode': doc['fathernode'],
            'text': doc['text'],
            'KeyVals': doc['KeyVals'],
            'titulo': doc['titulo'],
            'DecisionVals':doc['DecisionVals']
        })
    return jsonify(cuadros)


@app.route('/api/deleteHist/<id>', methods=['DELETE'])
@cross_origin()
def deleteHist(id):
    db = mongo.db.Historia
    dbC = mongo.db.Cuadro
    dbC.delete_many({"histid": id})
    result = db.findById(id).remove()
    return result.deleted_count


@app.route('/api/deleteCuadro/<id>', methods=['DELETE'])
@cross_origin()
def deleteCuadro(id):
    dbC = mongo.db.Cuadro
    result = dbC.findById(id).remove()
    return result.deleted_count


@app.route('/api/cuadro', methods=["POST"])
@cross_origin()
def createCuad():
    cuad = mongo.db.Cuadro
    KeyVals = request.get_json()['KeyVals']
    DecisionVals = request.get_json()['DecisionVals']
    fathernode = request.get_json()['fathernode']
    histid = request.get_json()['histid']
    titulo = request.get_json()['titulo']
    text = request.get_json()['text']
    cuad_id = cuad.insert_one({
        'histid': histid,
        'fathernode': fathernode,
        'titulo': titulo,
        'text': text,
        'KeyVals': KeyVals,
        'DecisionVals': DecisionVals
    }).inserted_id
    new_cuad = cuad.find_one({'_id': cuad_id})
    return jsonify({'result' : new_cuad["_id"]})




# Update de un cuadro recibiendo su id
@app.route('/api/cuadro', methods=["PUT"])
@cross_origin()
def updateCuadro():
    cuad = mongo.db.Cuadro
    print(request.get_json())
    KeyVals = request.get_json()['KeyVals']
    DecisionVals = request.get_json()['DecisionVals']
    fathernode = request.get_json()['fathernode']
    histid = request.get_json()['histid']
    titulo = request.get_json()['titulo']
    text = request.get_json()['text']
    c_id = request.get_json()['_id']
    new_cuad = {
        'histid': histid,
        'titulo': titulo,
        'fathernode': fathernode,
        'text': text,
        'KeyVals': KeyVals,
        'DecisionVals': DecisionVals
    }
    cuad.update_one({'_id': ObjectId(c_id)}, {"$set": new_cuad})
    foundnew_cuad = cuad.find_one({'_id': ObjectId(c_id)})
    return jsonify({'result' : foundnew_cuad["_id"]})

@app.route('/api/hist', methods=["PUT"])
@cross_origin()
def updateHist():
    story = mongo.db.Historia
    titulo = request.get_json()['titulo']
    userid = request.get_json()['userid']
    descripcion = request.get_json()['descripcion']
    valvar = request.get_json()['valvar']
    nombrevar = request.get_json()['nombrevar']
    firstnode = request.get_json()['firstnode']
    c_id = request.get_json()['_id']
    story_id = {
        "_id" : ObjectId(c_id),
        'titulo': titulo,
        'userid': userid,
        'descripcion': descripcion,
        "valvar" : valvar,
        "nombrevar" : nombrevar,
        "firstnode" : firstnode
    }
    story.update_one({'_id': ObjectId(c_id)}, story_id)
    foundnew_cuad = story.find_one({'_id':  ObjectId(c_id)})
    print("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    print(foundnew_cuad)
    return jsonify({"result":foundnew_cuad})



@app.route('/api/hist', methods=["POST"])
@cross_origin()
def createHist():
    story = mongo.db.Historia
    titulo = request.get_json()['titulo']
    userid = request.get_json()['userid']
    descripcion = request.get_json()['descripcion']
    valvar = request.get_json()['valvar']
    nombrevar = request.get_json()['nombrevar']
    firstnode = request.get_json()['firstnode']
    story_id = story.insert_one({
        'titulo': titulo,
        'userid': userid,
        'descripcion': descripcion,
        "valvar" : valvar,
        "nombrevar" : nombrevar,
        "firstnode" : firstnode
    }).inserted_id
    new_st = story.find_one({'_id': story_id})
    result = {'id': new_st['_id']}
    return jsonify(result = {'id': new_st['_id']})


#######################################
@app.route('/api/users', methods=['GET'])
@cross_origin()
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





@app.route('/api/users/register', methods=["POST"])
@cross_origin()
def register():
    users = mongo.db.Usuario
    usuario = request.get_json()['usuario']
    ex_user = users.find_one({"usuario": request.get_json()['usuario']})
    if ex_user is not None:
        return "ya existe"
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
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

@app.route('/api/users/login', methods=['POST'])
@cross_origin()
def login():
    users = mongo.db.Usuario
    usuario = request.get_json()['usuario']
    password = request.get_json()['password']
    result = ""
    response = users.find_one({'usuario': usuario})
    if response:
        if  bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'usuario': response['usuario'],
                'password': response['password']
            })

            new_user = users.find_one({'usuario': usuario})
            result = jsonify({'token':access_token, 'id':new_user["_id"]})
            print(access_token)
        else:
            exit;
            result = jsonify({"result":"0"})
    else:
        result = jsonify({"result":"0"})
    return result

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
