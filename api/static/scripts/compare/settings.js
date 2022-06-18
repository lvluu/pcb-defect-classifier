az.hold_value.conf = 0.5;
az.hold_value.iou = 0.25;
az.hold_value.offset = 20;
az.hold_value.classifier_model = 'resnet18';
az.hold_value.yolo_model = 'yolov5n';

labels = ['IOU (NoneREF)', 'CONF', 'OFFSET (REF)'];

function pop_settings() {
  az.add_modal({
    this_class: 'settings_modal',
    content_class: 'settings_modal_content',
  });
  az.style_modal('settings_modal', 1, {
    width: 'auto',
    height: 'auto',
    padding: '40px',
  });
  az.add_text('settings_modal_content', 1, {
    this_class: 'settings_title',
    text: 'SETTINGS',
  });
  az.style_text('settings_title', 1, {
    align: 'center',
    'font-size': '22px',
    'font-family': 'Staatliches',
  });
  az.add_text('settings_modal_content', 1, {
    this_class: 'settings_title_sub',
    text: 'Choose Model Settings',
  });
  az.style_text('settings_title_sub', 1, {
    align: 'center',
    'font-size': '18px',
    'font-family': 'Staatliches',
    'margin-bottom': '20px',
    color: 'darkslategrey',
  });
  az.add_layout('settings_modal_content', 1, {
    this_class: 'settings_layout',
    row_class: 'settings_layout_rows',
    cell_class: 'settings_layout_cells',
    number_of_rows: 5,
    number_of_columns: 2,
  });
  az.style_layout('settings_layout', 1, {
    height: '200px',
    width: 'auto',
    column_widths: ['30%', '70%'],
    border: 0,
  });
  az.call_multiple({
    iterations: labels.length,
    function: function (elem, index) {
      az.add_text('settings_layout_cells', index * 2 + 1, {
        this_class: 'defect_title',
        text: labels[index],
      });
      if (labels[index] === 'OFFSET (REF)') {
        az.add_slider('settings_layout_cells', index * 2 + 2, {
          this_class: 'settings_sliders',
          default_value: az.hold_value.conf || 20,
          min_value: 10,
          max_value: 30,
          text_class: 'slider_label',
        });
      } else
        az.add_slider('settings_layout_cells', index * 2 + 2, {
          this_class: 'settings_sliders',
          default_value: 0.5,
          step: 0.01,
          min_value: 0,
          max_value: 1,
          text_class: 'slider_label',
        });
      az.style_text('slider_label', index + 1, {
        color: 'black',
        'margin-left': '10px',
        'margin-right': '10px',
      });
    },
  });
  az.add_text('settings_layout_cells', 7, {
    this_class: 'defect_title',
    text: 'Classifier Model (NoneREF)',
  });

  az.add_dropdown('settings_layout_cells', 8, {
    this_class: 'dropdown_settings',
    options: [
      'resnet18',
      'resnet34',
      'resnet50',
      'resnet101',
      'resnet152',
      'densenet121',
      'densenet161',
      'densenet169',
      'densenet201',
      'squeezenet10',
      'squeezenet11',
      'vgg16bn',
      'vgg19bn',
    ],
  });
  az.add_text('settings_layout_cells', 9, {
    this_class: 'defect_title',
    text: 'YOLO Version (NoneREF)',
  });
  az.add_dropdown('settings_layout_cells', 10, {
    this_class: 'dropdown_settings',
    options: ['yolov5n', 'yolov5s', 'yolov5m', 'yolov5l', 'yolov5x'],
  });
  az.all_style_text('defect_title', {
    align: 'center',
    'font-size': '16px',
    color: 'black',
    'margin-right': '8px',
    align: 'left',
  });
  az.choose_from_dropdown('dropdown_settings', 1, {
    option: az.hold_value.classifier_model,
  });
  az.choose_from_dropdown('dropdown_settings', 2, {
    option: az.hold_value.yolo_model,
  });
  az.all_style_slider('settings_sliders', {
    align: 'center',
  });
  az.all_style_slider('dropdown_settings', {
    align: 'center',
  });

  if (typeof az.hold_value.iou !== 'undefined') {
    az.set_slider_value('settings_sliders', 1, az.hold_value.iou);
    az.set_slider_value('settings_sliders', 2, az.hold_value.conf);
    az.set_slider_value('settings_sliders', 3, az.hold_value.offset);
  }

  az.all_add_event('settings_sliders', {
    type: 'as_change',
    function: function () {
      az.hold_value.iou = Number(az.grab_value('settings_sliders', 1));
      az.hold_value.conf = Number(az.grab_value('settings_sliders', 2));
      az.hold_value.offset = Number(az.grab_value('settings_sliders', 3));
    },
  });
  az.all_add_event('dropdown_settings', {
    type: 'as_change',
    function: function () {
      az.hold_value.classifier_model = az.grab_value('dropdown_settings', 1);
      az.hold_value.yolo_model = az.grab_value('dropdown_settings', 2);
    },
  });
}
