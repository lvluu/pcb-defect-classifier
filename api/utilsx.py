import cv2
import os
import shutil
import numpy as np
import pandas as pd
from fastai.vision import *
from .utilsx import *

# CLOUDINARY
import cloudinary
from cloudinary import uploader
from cloudinary.utils import cloudinary_url

async_option = {"async": True}
cloudinary.config( 
  cloud_name = "dpzbhxcev", 
  api_key = "238428525238355", 
  api_secret = "1RyPzNXEeoYncPzUxd2h4v1ZmUw" 
)

##########################
device = torch.device("cuda")
default_model = load_learner('classifiers')

if not os.path.exists('results'):
  os.makedirs('results')
if not os.path.exists('diff_img'):
  os.makedirs('diff_img')

def predict(p, model_name):
    
    if (model_name == 'resnet18'):
        model = load_learner('classifiers','resnet18_defect_classifier.pkl')
    if (model_name == 'resnet34'):
        model = load_learner('classifiers','resnet34_defect_classifier.pkl')
    if (model_name == 'resnet50'):
        model = load_learner('classifiers','resnet50_defect_classifier.pkl')
    if (model_name == 'resnet101'):
        model = load_learner('classifiers','resnet101_defect_classifier.pkl')
    if (model_name == 'resnet152'):
        model = load_learner('classifiers','resnet152_defect_classifier.pkl')
    if (model_name == 'densenet121'):
        model = load_learner('classifiers','densenet121_defect_classifier.pkl')
    if (model_name == 'densenet161'):
        model = load_learner('classifiers','densenet161_defect_classifier.pkl')
    if (model_name == 'densenet169'):
        model = load_learner('classifiers','densenet169_defect_classifier.pkl')
    if (model_name == 'densenet201'):
        model = load_learner('classifiers','densenet201_defect_classifier.pkl')
    if (model_name == 'squeezenet10'):
        model = load_learner('classifiers','squeezenet1_0_defect_classifier.pkl')
    if (model_name == 'squeezenet11'):
        model = load_learner('classifiers','squeezenet1_1_defect_classifier.pkl')
    if (model_name == 'vgg16bn'):
        model = load_learner('classifiers','vgg16bn_defect_classifier.pkl')
    if (model_name == 'vgg19bn'):
        model = load_learner('classifiers','vgg19bn_defect_classifier.pkl')
    else:
        model = default_model

    img = Image(pil2tensor(p, dtype=np.float32).div_(255))
    prediction = model.predict(img)
    pred = round(torch.max(prediction[2]).item(), 2)
    return (str(prediction[0])), pred

def subtract_images_util(image_path_1, image_path_2):
    image1 = cv2.imread(image_path_1)
    image2 = cv2.imread(image_path_2)

    difference = cv2.subtract(image1, image2)
    difference1 = cv2.subtract(image2, image1)

    dst1 = cv2.addWeighted(difference, 0.5, difference1, 0.5, 0)
    dst = cv2.cvtColor(dst1, cv2.COLOR_BGR2GRAY)

    _, mask = cv2.threshold(dst, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)
    image1[mask != 255] = [0, 0, 255]

    return image1

def subtract_images(image_path_1, image_path_2, id, offset=20, conf=0.5, upload=False, classifier_model='resnet18'):
    img1 = subtract_images_util(image_path_1, image_path_2)
    return extract_contours_from_image(img1, id, offset=offset, conf=conf, model_name=classifier_model, upload=upload)

def extract_contours_from_image(image1, id, hsv_lower=[0, 150, 50], hsv_upper=[10, 255, 255],offset=20, conf=0.5, upload=False, model_name='resnet18'):
    image = image1.copy()
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_lower = np.array(hsv_lower)
    hsv_upper = np.array(hsv_upper)
    mask = cv2.inRange(hsv, hsv_lower, hsv_upper)

    image[mask != 0] = [0, 0, 255]
    original = image.copy()

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
    close = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel, iterations=1)

    cnts = cv2.findContours(close, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
   
    ROI_number = 0
    preds = []
    for c in cnts:
        x, y, w, h = cv2.boundingRect(c)
        ROI = original[y - offset:y + h + offset, x - offset:x + w + offset]
        try:
            text, pred = predict(ROI, model_name) 
            if text != 'not_defect' and pred >= conf:
                contour_name = "contours/" + id + '/contour_{}.png'.format(ROI_number)
                cv2.imwrite(contour_name, ROI)
                if(upload):
                    contour_name = upload_to_cloudinary(contour_name)
                cv2.rectangle(image, (x - offset, y - offset), (x + w + offset, y + h + offset), (36, 255, 12), 1)
                cv2.putText(image, text + ":" + str(pred), (x - offset, y - offset - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (36,255,12), 1)
                preds.append([contour_name, text, pred])
        except:
            pass
        ROI_number += 1
    result_img_name = "diff_img/diff_" + id +".png"
    cv2.imwrite(result_img_name , image)
    if(upload): result_img_name = upload_to_cloudinary(result_img_name)
    return preds, result_img_name



def directory(choice, directory_path, force=False):
    if choice == 'make':
        os.mkdir(directory_path)
    if choice == 'remove':
        if force:
            shutil.rmtree(directory_path)
        else:
            os.rmdir(directory_path)


def upload_to_cloudinary(upload_file_path):
    end_of_path = upload_file_path.rfind('/')
    folder_path = upload_file_path[0:end_of_path]
    if os.path.exists(upload_file_path):
        upload_result = uploader.upload(upload_file_path, public_id = upload_file_path[end_of_path:],folder = folder_path, **async_option)
        if (not upload_result.__contains__('url')):
            return upload_file_path
        return upload_result['url']
    return "file not found to upload"