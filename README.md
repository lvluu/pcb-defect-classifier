# PCB Defect Classifier Application

This application uses image processing and Deep Learning to detect and extract defects from Printed Circuit Board (PCB) images and predict their defect type. 

### Install Requirements

run `pip install -r requirements.txt` in your console

### Add Image Files to Defect Classifier Application

    test_temps
    └── 000410009_temp.jpg
    └── 000410009_test.jpg
    └── 00041012_temp.jpg
    └── 00041012_test.jpg
    ...
    └── test_temps.json

### Add Model to Application (or use the preinstalled model). You can download model [here](https://drive.google.com/drive/folders/1LR7WVbInLAOfKNVAUf0sT41khzC0LNw2?usp=sharing)

    
    cp -a "/models/classifiers/." "/pcb-defect-classifier/classifiers"
    cp -a "/models/yolov5/." "/pcb-defect-classifier/api"

### Start the Service

    python api/app.py

### Result 

![prediction-process](https://user-images.githubusercontent.com/102818239/184150623-3c4c6412-2173-4558-84bb-f8ed28ec1bf7.gif)
