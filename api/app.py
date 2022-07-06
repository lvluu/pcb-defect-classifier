from flask import Flask, request, jsonify, send_from_directory, render_template, make_response, redirect
import json
from .image_differencing import *
from .classifier import *
from .utility import *
from .save_history import *
from flask_cors import CORS, cross_origin

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

PREFIX_CDN_URL  = 'https://d3v9w8fl9ro1bk.cloudfront.net'
# PREFIX_CDN_URL  = ''


app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
# cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
#     api_secret=os.getenv('API_SECRET'))
working_path = os.getcwd()

UPLOAD_FOLDER = os.path.join(working_path, 'uploads')
if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods'] =  "POST, GET, PUT, DELETE, OPTIONS"
    return(response)

@app.route("/get_history", methods=["GET"])
def get_history():
    # pageSize=20&pageNumber=1
    page = request.args.get("pageNumber")
    if page:
        page = int(page) - 1
    size = request.args.get("pageSize")
    if not page:
        page = 0
    if not size: 
        size = 10
    
    size = int(size)
    res = load_history()
    index = page * size 
    maxSize = len(res)
    end = index + size 
    if (end > maxSize):
        end = maxSize

    return make_response(jsonify(items=res[index:end], maxSize=len(res), page=page, size=size))

@app.route("/function", methods=["GET"])
def call_function():
    res = request_return()
    return(res)

@app.route("/heath", methods=["GET"])
def heath_check():
    return("Song khoe~")

@app.route("/random", methods=["GET"])
def render_random_page():
    return render_template('random.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/history", methods=["GET"])
def render_history_page():
    return render_template('history.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/history/<id>", methods=["GET"])
def render_history_page_detail(id):
    list_history = load_history()
    for item in list_history:
        if item['id'] == id:
            return render_template('history_detail.html',PREFIX_CDN_URL=PREFIX_CDN_URL, item=item, cloudinary_prefix_url="")
    return redirect('/404')

@app.route("/model", methods=["GET"])
def render_model_page():
    return render_template('model.html', PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/", methods=["GET"])
def render_index_page():
    return render_template('index.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/404", methods=["GET"])
def render_404():
    return render_template('404.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/about", methods=["GET"])
def render_about_page():
    return render_template('about.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/yolo", methods=["GET"])
def render_yolo_page():
    return render_template('yolo.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/detect", methods=["GET"])
def render_detect_page():
    return render_template('detect.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/compare", methods=["GET"])
def render_compare_page():
    return render_template('compare.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/upload", methods=["GET"])
def render_upload_page():
    return render_template('upload.html',PREFIX_CDN_URL=PREFIX_CDN_URL)

@app.route("/upload", methods=["POST"])
def handle_upload_multi_file():
    files = request.files.getlist("files[]")
    list_imgs = []
    for file in files:
        if (file.filename):
            my_write_file = os.path.join(UPLOAD_FOLDER, file.filename)
            list_imgs.append('uploads/' + file.filename)
            file.save(my_write_file)
    test_imgs = list(filter(lambda img: '_test' in img, list_imgs))
    template_imgs = list(filter(lambda img: '_temp' in img, list_imgs))
    
    result = handle_predict_multiple_file(sorted(test_imgs), sorted(template_imgs))
    # result: [{test: , temp: , predict_img:, list_contour[ { }] }]
    return jsonify({"message" : "SUCCESS", 'data': result})


# STATIC FILES

@app.route('/contours/<path:filename>', methods=["GET"])
def send_contours(filename):
    return send_from_directory('../contours/', filename)

@app.route('/test_temps/<path:filename>', methods=["GET"])
def send_test_temps(filename):
    return send_from_directory('../test_temps/', filename)
    
@app.route('/diff_img/<path:filename>', methods=["GET"])
def send_diff_img(filename):
    return send_from_directory('../diff_img/', filename)

@app.route('/results/<path:filename>', methods=["GET"])
def send_results(filename):
    return send_from_directory('../results/', filename)

@app.route('/uploads/<path:filename>', methods=["GET"])
def send_uploads(filename):
    return send_from_directory('../uploads/', filename)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
