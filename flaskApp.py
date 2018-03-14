#coding=UTF-8
import pymysql
from flask import Flask,request,jsonify
from flask_cors import CORS
import json


app = Flask(__name__)
cors = CORS(app,resources={r"/*":{"origins":"*"}})
def connect():
    db = pymysql.connect("localhost","root","123456","data7",charset="utf8")

    return db


@app.route('/sell', methods=['POST'])
def set_selldata():
    pdata = json.loads(request.get_data())
    print(pdata)
    db = connect()

    cursor = db.cursor()

    sql = "insert into data7.data values ("+'\''+pdata['elecount']+'\','+'\''+pdata['electype']+'\','+'\''+pdata['electper']+'\','+'\''+pdata['electext']+'\''+'\''+pdata['hash']+'\''+")"
    print(sql)
    cursor.execute("insert into data7.data values ("+'\''+pdata['elecount']+'\','+'\''+pdata['electype']+'\','+'\''+pdata['electper']+'\','+'\''+pdata['electext']+'\','+'\''+pdata['hash']+'\''+")")
    db.commit()
    data = cursor.fetchone()
    print(data)
    return ""

@app.route('/sell2', methods=['POST'])
def set_selldata2():
    pdata = json.loads(request.get_data())
    print(pdata)
    db = connect()

    cursor = db.cursor()

    sql = "insert into data7.data2 values ("+'\''+pdata['elecount']+'\','+'\''+pdata['electype']+'\','+'\''+pdata['electper']+'\','+'\''+pdata['electext']+'\''+'\''+pdata['hash']+'\''+")"
    print(sql)
    cursor.execute("insert into data7.data2 values ("+'\''+pdata['elecount']+'\','+'\''+pdata['electype']+'\','+'\''+pdata['electper']+'\','+'\''+pdata['electext']+'\','+'\''+pdata['hash']+'\''+")")
    db.commit()
    data = cursor.fetchone()
    print(data)
    return ""

@app.route('/product',methods=['GET'])
def get_product():
    db = connect()
    cursor = db.cursor()
    cursor.execute("select * from data7.data")
    data = cursor.fetchall()
    print(data)
    ret = []
    if len(data)==0:
        return ""
    for e in data:
        ret.append({
            'elecount': e[0],
            'electype': e[1],
            'electper': e[2],
            'electext': e[3],
            'hash': e[4]
        })
    print (ret)
    return jsonify(ret)
@app.route('/product2',methods=['GET'])
def get_product2():
    db = connect()
    cursor = db.cursor()
    cursor.execute("select * from data7.data2")
    data = cursor.fetchall()
    print(data)
    ret =[]
    if len(data)==0:
        return""
    for e in data:
        ret.append({
            'elecount':e[0],
            'electype':e[1],
            'electper':e[2],
            'electext':e[3],
            'hash': e[4]
        })
    print (ret)
    return jsonify(ret)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)