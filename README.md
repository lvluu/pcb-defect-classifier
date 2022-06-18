# PCB Defect Classifier Application

This application uses image processing and Deep Learning to detect and extract defects from Printed Circuit Board (PCB) images and predict their defect type. For details see the Medium post here (at ref).

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

### Add Model to Application (or use the preinstalled model)

    mv ../Desktop/**defect_classifier.pkl** model/

### Start the Service

    python api/app.py

### Result

![enter image description here](https://collaboratescience.com/stack/defect_classifier.gif)

## SUPPORT
