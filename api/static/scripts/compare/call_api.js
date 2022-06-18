function difference_images() {
  $('div.added_load').remove();
  loading_display();
  image_path_1 = cur_test_image.replace('/', '');
  image_path_2 = cur_template_image.replace('/', '');
  $('.execute_time_title').remove();
  params = {
    function: 'image_differencing',
    image_path_1: image_path_1,
    image_path_2: image_path_2,
    offset: az.hold_value.offset,
    conf_thres: az.hold_value.conf,
    classifier_model: az.hold_value.classifier_model,
    upload: az.hold_value.is_upload || '',
  };
  az.call_api({
    url: az.hold_value.config.api_url,
    parameters: params,
    done: function (data) {
      show_copped_labelled(data);
      count_label = {
        mousebite: 0,
        open: 0,
        pinhole: 0,
        short: 0,
        spur: 0,
        spurious: 0,
      };
      data.preds.map((a) => count_label[a[1]]++);
      result = '';
      for (const [key, value] of Object.entries(count_label)) {
        result += key + ' (' + value + ')    ';
      }
      az.add_text('tally_layout_cells', 6, {
        this_class: 'execute_time_title',
        text: az.hold_value.classifier_model,
      });
      az.add_text('tally_layout_cells', 7, {
        this_class: 'execute_time_title',
        text: result,
      });
      az.add_text('tally_layout_cells', 2 * 4, {
        this_class: 'execute_time_title',
        text: data.execute_time.toFixed(4) + ' (s)',
      });
      az.all_style_text('execute_time_title', {
        align: 'center',
        'font-size': '20px',
        color: 'black',
      });
    },
    fail: function (err) {},
  });

  params = {
    function: 'yolo_predict',
    image_path_1: image_path_1,
    image_path_2: image_path_2,
    iou_thres: az.hold_value.iou,
    conf_thres: az.hold_value.conf,
    yolo_model: az.hold_value.yolo_model,
  };

  az.call_api({
    url: az.hold_value.config.api_url,
    parameters: params,
    done: function (data) {
      show_copped_labelled_2(data);
      count_label = {
        mousebite: 0,
        open: 0,
        pinhole: 0,
        short: 0,
        spur: 0,
        spurious: 0,
      };
      data.preds.map((a) => count_label[a[1]]++);
      result = '';
      for (const [key, value] of Object.entries(count_label)) {
        result += key + ' (' + value + ')    ';
      }
      az.add_text('tally_layout_cells', 10, {
        this_class: 'execute_time_title',
        text: az.hold_value.yolo_model,
      });
      az.add_text('tally_layout_cells', 11, {
        this_class: 'execute_time_title',
        text: result,
      });

      az.add_text('tally_layout_cells', 3 * 4, {
        this_class: 'execute_time_title',
        text: data.execute_time.toFixed(4) + ' (s)',
      });
      az.all_style_text('execute_time_title', {
        align: 'center',
        'font-size': '20px',
        color: 'black',
      });
    },
    fail: function (err) {
      console.log('[FAIL] fail rui');
    },
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
