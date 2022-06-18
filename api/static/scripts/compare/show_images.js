img_cnt = -1;
var use_path = '/test_temps/';
let cur_test_image = '',
  cur_template_image = '';
function fetch_image() {
  img_cnt++;
  if (img_cnt < az.hold_value.test_temps.length) {
    cur_test_image = use_path + az.hold_value.test_temps[img_cnt];
    cur_template_image =
      use_path + az.hold_value.test_temps[img_cnt].replace('_test', '_temp');
    az.all_remove_element('show_img');
    az.add_image('main_layout_cells', 6, {
      this_class: 'show_img',
      image_path: cur_test_image,
    });
    az.add_image('main_layout_cells', 7, {
      this_class: 'show_img',
      image_path: cur_template_image,
    });
    az.all_style_image('show_img', {
      align: 'center',
      width: '330px',
      'max-width': '350px',
      'min-width': '300px',
      'border-radius': '2px',
      border: '1px solid #dbdbdb',
    });
  } else {
    alert('No more test/template images in process.');
  }
}
