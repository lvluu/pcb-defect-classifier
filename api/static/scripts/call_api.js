function difference_images() {
  $('div.added_load').remove();
  loading_display();
  image_path_1 = $('.show_img').eq(0).attr('src').replace('/', '');
  image_path_2 = $('.show_img').eq(1).attr('src').replace('/', '');

  params = {
    function: 'image_differencing',
    image_path_1: image_path_1,
    image_path_2: image_path_2,
    offset: az.hold_value.offset,
    conf_thres: az.hold_value.conf,
    classifier_model: az.hold_value.classifier_model,
    upload: az.hold_value.is_upload || "",
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
