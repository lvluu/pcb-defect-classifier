function show_copped_labelled_2(data) {
  let result_img = data.result_img;
  if (!result_img.startsWith('http')) result_img = '/' + result_img;
  $('.show_img')
    .eq(1)
    .attr('src', result_img);
  showOneCropImg_2(data.preds.length, data.preds);
}

function showOneCropImg_2(current_contours_cnt, listImgs) {
  az.remove_element('crops_none_ref_layout_header', 1);
  az.remove_element('crops_none_ref_layout', 1);
  az.add_layout('no_ref_detected_container', 1, {
    this_class: 'crops_none_ref_layout_header',
    row_class: 'crops_none_ref_layout_header_rows',
    cell_class: 'crops_none_ref_layout_header_cells',
    number_of_rows: 1,
    number_of_columns: 2,
  });
  az.style_layout('crops_none_ref_layout_header', 1, {
    height: 'auto',
    width: '100%',
    column_widths: ['50%', '50%'],
    border: 1,
  });
  az.add_layout('no_ref_detected_container', 1, {
    this_class: 'crops_none_ref_layout',
    row_class: 'crops_none_ref_layout_rows',
    cell_class: 'crops_none_ref_layout_cells',
    number_of_rows: current_contours_cnt,
    number_of_columns: 2,
  });
  az.fill_row('crops_none_ref_layout_header', 1, {
    header: false,
    cell_class: 'crops_none_ref_layout_header_cells',
    text_class: 'crops_none_ref_header',
    row_number: 1,
    array: ['DETECTED DEFECTS', 'CLASSIFICATION'],
  });
  az.all_style_text('crops_none_ref_header', {
    align: 'center',
    color: 'var(--typography-interactive-secondary-teal-default)',
  });
  az.style_layout('crops_none_ref_layout', 1, {
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
      az.add_image('crops_none_ref_layout_cells', index * 2 + 1, {
        this_class: 'extracted_defect_img_nonref',
        image_path: img_path,
      });
      az.all_style_image('extracted_defect_img_nonref', {
        width: '60%',
        border: '1px solid var(--border-primary-teal)',
        align: 'center',
      });

      handleAddLabel_2(
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

function handleAddLabel_2(index, type, pred) {
  az.add_text('crops_none_ref_layout_cells', index * 2 + 2, {
    this_class: 'show_predict_text_ref',
    text: type,
  });
  az.style_text(
    'show_predict_text_ref',
    az.last_class_instance('show_predict_text_ref'),
    {
      align: 'center',
      color: 'black',
    }
  );
}
