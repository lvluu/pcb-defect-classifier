from fastai.vision import *
import json

learn = load_learner('classifiers')
def classifier(image_path):
    img = open_image(image_path)
    prediction = learn.predict(img)
    print(prediction[0])
    return(str(prediction[0]))

def predict(image_path):
    prediction = classifier(image_path)
    return(prediction)