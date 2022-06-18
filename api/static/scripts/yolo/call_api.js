function difference_images() {
  $('div.added_load').remove();
  loading_display();
  image_path_1 = $('.show_img').eq(0).attr('src').replace('/', '');
  image_path_2 = $('.show_img').eq(1).attr('src').replace('/', '');

  params = {
    function: 'yolo_predict',
    image_path_1: image_path_1,
    image_path_2: image_path_2,
    iou_thres: az.hold_value.iou,
    conf_thres: az.hold_value.conf,
    yolo_model: az.hold_value.yolo_model,
    upload: az.hold_value.is_upload || '',
  };

  az.call_api({
    url: az.hold_value.config.api_url,
    parameters: params,
    done: function (data) {
      show_copped_labelled(data);
    },
    fail: function (err) {},
  });
}

function remove_diff_img() {
  params = {
    function: 'remove_diff_img',
  };
  az.call_api({
    url: az.hold_value.config.api_url,
    parameters: params,
    done: function (data) {},
    fail: function (err) {},
  });
}

function remove_contours() {
  params = {
    function: 'remove_contours',
  };
  az.call_api({
    url: az.hold_value.config.api_url,
    parameters: params,
    done: function (data) {},
    fail: function (err) {},
  });
}
