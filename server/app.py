from flask import Flask, render_template, Response, jsonify, request

app = Flask(__name__, static_folder='public/static', template_folder="public")

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    img = request.get_json()["image"]
    return jsonify({"note": detection.detect(img)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)