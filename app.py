from flask import Flask
from flask_restful import Api, Resource
import json

app = Flask(__name__, static_url_path='', static_folder='webapp/public')
api = Api(app)

# Load data from the JSON database
with open('db/db.json', 'r') as file:
    users = json.load(file)


class User(Resource):
    def get(self, name):
        for user in users:
            if name == user["buzzword"]:
                return user, 200
        return "This buzzword is so 2018", 404


api.add_resource(User, "/ninjify/<string:name>")

@app.route("/")
def root():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(debug=True)
