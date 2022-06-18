import os
from flask import request, jsonify
from .classifier import *
from .image_differencing import *
from .save_history import *
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

def remove_diff_img():
    os.system('rm diff_img/*')

def remove_contours():
    os.system('rm contours/*')

def count_contours(path):
    path, dirs, files = next(os.walk("contours/" + path + "/"))
    file_count = len(files)
    return(file_count)

my_operations = {
    "image_differencing" : image_differencing,
    "yolo_predict" : yolo_predict
}

def request_return():
    passed_function = request.args.get("function")
    try:
        args = dict(request.args)
        del args['function']
        res = my_operations[passed_function](**args)
        executor = ThreadPoolExecutor(max_workers=100)
        task1 = executor.submit(save_history, res)
        return(jsonify(res))
    except ValueError:
        return(ValueError)