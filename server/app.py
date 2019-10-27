from flask import Flask, send_from_directory, Response, jsonify, request
import detection as dt
import io
import numpy as np
import cv2
from PIL import Image
import base64
from imageio import imread

app = Flask(__name__, static_url_path="", static_folder="static")

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route('/api/detect', methods=['POST'])
def detect():
    img, calibrated = request.json["image"], request.json["calibrated"]
    nparr = np.fromstring(str.encode(img), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_ANYCOLOR)
    if calibrated:
        return jsonify({"note": dt.capture(image)})
    else:
        dt.calibrate()
        return jsonify({"note": ""})

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)