const use_path = '/test_temps/';
function fetch_image() {
  if (az.hold_value.test_temps && 0 < az.hold_value.test_temps.length) {
    let img_cnt = Math.floor(Math.random() * az.hold_value.test_temps.length);
    console.log('Random img index ', img_cnt);
    const test_image = use_path + az.hold_value.test_temps[img_cnt];
    const template_image =
      use_path + az.hold_value.test_temps[img_cnt].replace('_test', '_temp');
    az.all_remove_element('show_img');
    az.add_image('main_layout_cells', 5, {
      this_class: 'show_img',
      image_path: test_image,
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
