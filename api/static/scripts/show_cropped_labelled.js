function show_copped_labelled(data) {
  let result_img = data.result_img;
  if (!result_img.startsWith('http')) result_img = '/' + result_img;

  $('.show_img')
    .eq(0)
    .attr('src',result_img);
  showOneCropImg(data.preds.length, data.preds);
  $('div.added_load').remove();
  az.add_html('loading_layout_cells', 3, {
    html: `<div class='added_load' style='color:var(--typography-primary-default); font-size: 1.3em;text-align: right;'>Predict time costs:  <strong>${data.execute_time.toFixed(
      4
    )} (s)</strong></div>`,
  });
}

function showOneCropImg(current_contours_cnt, listImgs) {
  az.remove_element('crops_layout_header', 1);
  az.remove_element('crops_layout', 1);
  az.add_layout('container', 1, {
    this_class: 'crops_layout_header',
    row_class: 'crops_layout_header_rows',
    cell_class: 'crops_layout_header_cells',
    number_of_rows: 1,
    number_of_columns: 2,
  });
  az.style_layout('crops_layout_header', 1, {
    height: 'auto',
    width: '100%',
    column_widths: ['50%', '50%'],
    border: 1,
  });
  az.add_layout('container', 1, {
    this_class: 'crops_layout',
    row_class: 'crops_layout_rows',
    cell_class: 'crops_layout_cells',
    number_of_rows: current_contours_cnt,
    number_of_columns: 2,
  });
  az.fill_row('crops_layout_header', 1, {
    header: false,
    cell_class: 'crops_layout_header_cells',
    text_class: 'crops_header',
    row_number: 1,
    array: ['DETECTED DEFECTS', 'CLASSIFICATION'],
  });
  az.all_style_text('crops_header', {
    align: 'center',
    color: 'var(--typography-interactive-secondary-teal-default)',
  });
  az.style_layout('crops_layout', 1, {
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

      az.add_image('crops_layout_cells', index * 2 + 1, {
        this_class: 'extracted_defect_img',
        image_path: img_path,
      });
      az.all_style_image('extracted_defect_img', {
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
  stop_load_display();
}

function handleAddLabel(index, text, type) {
  az.add_text('crops_layout_cells', index * 2 + 2, {
    this_class: 'show_predict_text',
    text: text,
  });
  az.style_text(
    'show_predict_text',
    az.last_class_instance('show_predict_text'),
    {
      align: 'center',
      color: 'black',
    }
  );
  add_tally({
    type: type,
  });
}
