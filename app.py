from flask import Flask
from flask_restful import Api, Resource
import json

app = Flask(__name__)
api = Api(app)

# Load data from the JSON database
with open('db.json', 'r') as file:
    users = json.load(file)

class User(Resource):
    def get(self, name):
        for user in users:
            if(name == user["buzzword"]):
                return user, 200
        return "This buzzword is so 2018", 404
      
api.add_resource(User, "/ninjify/<string:name>")

if __name__ == "__main__":
    app.run(debug=True)
