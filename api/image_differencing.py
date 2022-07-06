# import libraries
import cv2
import numpy as np
from flask import jsonify
import shortuuid
import time
from .utilsx import *
from .yolo import *
from .save_history import *
from datetime import datetime

def image_differencing(image_path_1, image_path_2, offset=20, conf_thres=0.5, upload="", classifier_model='resnet18'):

    uuid_rand = shortuuid.uuid()
    directory(**{
        "choice": "make",
        "directory_path": "contours/" + uuid_rand
    })
    start_time = time.time()
    preds, result_img = subtract_images(**{
        "image_path_1": image_path_1,
        "image_path_2": image_path_2,
        "id": uuid_rand,
        "offset" : int(offset),
        "conf": float(conf_thres),
        "upload": bool(upload),
        "classifier_model": classifier_model
    })

    return ({"preds": preds, 
    "result_img" : result_img, 
    "test_img" : image_path_1, 
    "temp_img": image_path_2, 
    "execute_time": time.time() - start_time,
    "settings": {
         "method": "REF",
         "model" : classifier_model,
         "conf": conf_thres,
         "upload": bool(upload),
         "offset": offset
     },
    "return_at" : datetime.now(),
    "id": uuid_rand
    })

def yolo_predict(image_path_1, image_path_2, conf_thres=0.5, iou_thres=0.25, upload="", yolo_model='yolov5n'):
    uuid_rand = shortuuid.uuid()
    preds, save_img_path, ex_time = predict_by_yolo(source=image_path_1,
        name=uuid_rand,
        conf_thres=float(conf_thres), 
        iou_thres=float(iou_thres),
        weights=yolo_model + '.pt',
        upload=bool(upload))

    return ({"preds": preds, 
    "result_img" : save_img_path,
     "test_img" : image_path_1, 
     "temp_img": image_path_2, 
     "execute_time": ex_time,
     "settings": {
         "method": "NoneREF",
         "iou": iou_thres,
         "model" : yolo_model,
         "conf": conf_thres
     },
    "return_at" : datetime.now(),
    "id": uuid_rand
     })

def extract_defects_using_contours(path_to_diff, id):
    directory(**{
        "choice": "make",
        "directory_path": "contours/" + id
    })
    extract_contours_from_image(**{
        "image_path": path_to_diff,
        "write_path": "contours/" + id + "/",
        "hsv_lower": [0, 150, 50],
        "hsv_upper": [10, 255, 255]
    })
    return (True)

def handle_predict_multiple_file(test_files):

    list_result = []
    for test in test_files:
        res = yolo_predict(**{
            "image_path_2": test.split("_")[0] + "_temp.jpg",
            "image_path_1": test,
        })
        list_result.append(res)
    return list_result



