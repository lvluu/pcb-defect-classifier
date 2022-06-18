function show_copped_labelled(data) {
  let result_img = data.result_img;
  if (!result_img.startsWith('http')) result_img = '/' + result_img;

  $('.show_img').eq(0).attr('src', result_img);
  showOneCropImg(data.preds.length, data.preds);
}

function showOneCropImg(current_contours_cnt, listImgs) {
  az.remove_element('ref_crops_layout_header', 1);
  az.remove_element('ref_crops_layout', 1);
  az.add_layout('ref_detected_container', 1, {
    this_class: 'ref_crops_layout_header',
    row_class: 'ref_crops_layout_header_rows',
    cell_class: 'ref_crops_layout_header_cells',
    number_of_rows: 1,
    number_of_columns: 2,
  });
  az.style_layout('ref_crops_layout_header', 1, {
    height: 'auto',
    width: '100%',
    column_widths: ['50%', '50%'],
    border: 1,
  });
  az.add_layout('ref_detected_container', 1, {
    this_class: 'ref_crops_layout',
    row_class: 'ref_crops_layout_rows',
    cell_class: 'ref_crops_layout_cells',
    number_of_rows: current_contours_cnt,
    number_of_columns: 2,
  });
  az.fill_row('ref_crops_layout_header', 1, {
    header: false,
    cell_class: 'ref_crops_layout_header_cells',
    text_class: 'ref_crops_header',
    row_number: 1,
    array: ['DETECTED DEFECTS', 'CLASSIFICATION'],
  });
  az.all_style_text('ref_crops_header', {
    align: 'center',
    color: 'var(--typography-interactive-secondary-teal-default)',
  });
  az.style_layout('ref_crops_layout', 1, {
    height: 'auto',
    width: '100%',
    column_widths: ['50%', '50%'],
    border: 1,
  });
  az.call_multiple({
    iterations: listImgs.length,
    function: function (elem, index) {
      let img_path = listImgs[index][0];
      if (!img_path.startsWith('http')) {
        img_path = '/' + img_path;
      }
      az.add_image('ref_crops_layout_cells', index * 2 + 1, {
        this_class: 'ref_extracted_defect_img',
        image_path: img_path,
      });
      az.all_style_image('ref_extracted_defect_img', {
        width: '60%',
        border: '1px solid var(--border-primary-teal)',
        align: 'center',
      });

      handleAddLabel(
        index,
        listImgs[index][1] +
          ' <b style="color: red">(' +
          listImgs[index][2] +
          ')</b>',
        listImgs[index][1]
      );
      if (index === listImgs.length - 1) {
        stop_load_display();
      }
    },
  });
}

function handleAddLabel(index, text, type) {
  az.add_text('ref_crops_layout_cells', index * 2 + 2, {
    this_class: 'ref_show_predict_text',
    text: text,
  });
  az.style_text(
    'ref_show_predict_text',
    az.last_class_instance('ref_show_predict_text'),
    {
      align: 'center',
      color: 'black',
    }
  );
}
