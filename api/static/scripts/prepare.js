// az.load_font('Staatliches');

az.add_top_button({
  this_class: 'to_top_button',
  text: 'TOP',
  side: 'right',
});
az.style_button('to_top_button', 1, {
  background: 'rgb(233, 130, 94)',
});
az.add_sections({
  this_class: 'my_sections',
  sections: 2,
});
az.all_style_sections('my_sections', {
  background: 'var(--background-positive-amount)',
  height: 'auto',
  'max-width': '1500px',
  'min-width': '1100px',
  width: '1100px',
});
az.add_layout('my_sections', 1, {
  this_class: 'banner_layout',
  row_class: 'banner_layout_rows',
  cell_class: 'banner_layout_cells',
  number_of_rows: 1,
  number_of_columns: 3,
});
az.style_layout('banner_layout', 1, {
  width: '100%',
  height: 'auto',
  align: 'center',
  border: 0,
});
az.call_once_satisfied({
  condition: "typeof(az.hold_value.extracted_defects_images) !== 'undefined'",
  function: function () {
    az.add_text('banner_layout_cells', 1, {
      this_class: 'image_count',
      text:
        'Number of images: ' + az.hold_value.extracted_defects_images.length,
    });
    az.all_style_text('image_count', {
      color: 'var(--typography-primary-default)',
      'font-size': '20px',
    });
    az.style_word('image_count', 1, {
      this_class: 'color_word',
      word: az.hold_value.extracted_defects_images.length,
      color: 'rgb(233, 130, 94)',
    });
  },
});
az.add_text('banner_layout_cells', 2, {
  this_class: 'title',
  text: `${method}`,
});
az.style_text('title', 1, {
  align: 'center',
  color: 'var(--typography-primary-default)',
  'font-size': '30px',
});
az.add_layout('my_sections', 2, {
  this_class: 'main_layout',
  row_class: 'main_layout_rows',
  cell_class: 'main_layout_cells',
  number_of_rows: 2,
  number_of_columns: 3,
});
az.style_layout('main_layout', 1, {
  width: '100%',
  height: '400px',
  align: 'center',
  border: '1',
});
az.style_layout('main_layout_cells', 4, {
  valign: 'center',
});
az.style_layout('main_layout_rows', 1, {
  height: '30px',
});
az.add_text('main_layout_cells', 1, {
  this_class: 'header',
  text: 'RESULTS',
});
az.add_text('main_layout_cells', 2, {
  this_class: 'header',
  text: 'TEST',
});
az.add_text('main_layout_cells', 3, {
  this_class: 'header',
  text: 'TEMPLATE',
});
az.all_style_text('header', {
  align: 'center',
  color: 'var(--typography-primary-default)',
  'font-size': '20px',
});
az.add_html('main_layout_cells', 4, {
  html: "<div class='hold_detected'></div>",
});
az.add_scrollable_container('hold_detected', 1, {
  this_class: 'container',
  direction: 'vertical',
});
az.style_scrollable_container('container', 1, {
  align: 'center',
  width: '90%',
  height: '320px',
  // background: '#5e6e88',
  'border-radius': '6px',
  border: '1px solid #dbdbdb',
});
az.add_button('banner_layout_cells', 1, {
  this_class: 'option_butts',
  text: 'FETCH TEST',
});
az.add_button('banner_layout_cells', 1, {
  this_class: 'option_butts',
  text: 'DETECT',
});
az.style_button('option_butts', 1, {
  background: 'var(--background-button-primary-teal-default)',
  color: 'var(--typography-primary-default)',
  color: 'white',
  outline: 0,
});

az.style_button('option_butts', 2, {
  'margin-left': '10px',
  background: 'var(--background-container-rhubarb)',
  border: '1px solid #dbdbdb',
  outline: 0,
  opacity: 0.5,
  'pointer-events': 'none',
});
az.style_button('option_butts', 3, {
  background: '#33d9b2',
});
az.add_event('option_butts', 1, {
  type: 'click',
  function: function () {
    az.animate_element('option_butts', 1, {
      type: 'rubberBand',
    });
    fetch_image();
    az.remove_element('crops_layout_header', 1);
    az.remove_element('crops_layout', 1);
    az.style_button('option_butts', 2, {
      opacity: 1,
      'pointer-events': 'auto',
    });
  },
});
az.add_event('option_butts', 2, {
  type: 'click',
  function: function () {
    az.animate_element('option_butts', 2, {
      type: 'spin',
    });
    difference_images();
    az.style_button('option_butts', 2, {
      opacity: 0.5,
      'pointer-events': 'none',
    });
  },
});
az.add_layout('banner_layout_cells', 3, {
  this_class: 'loading_layout',
  row_class: 'loading_layout_rows',
  cell_class: 'loading_layout_cells',
  number_of_rows: 1,
  number_of_columns: 10,
});
az.style_layout('loading_layout', 1, {
  width: 'auto',
  height: '40px',
  position: 'absolute',
  border: 0,
});
az.add_icon('banner_layout_cells', 3, {
  this_class: 'settings_icon',
  icon_class: 'fa-cog',
});
az.style_icon('settings_icon', 1, {
  color: 'var(--typography-primary-default)',
  float: 'right',
  'font-size': '30px',
  cursor: 'pointer',
});
az.add_event('settings_icon', 1, {
  type: 'click',
  function: function () {
    pop_settings();
  },
});
az.add_layout('my_sections', 2, {
  this_class: 'tally_layout',
  row_class: 'tally_layout_rows',
  cell_class: 'tally_layout_cells',
  number_of_rows: az.hold_value.defects.length,
  number_of_columns: 3,
});
az.style_layout('tally_layout', 1, {
  width: '100%',
  height: '150px',
  align: 'center',
  'margin-top': '10px',
  column_widths: ['10%', '80%', '10%'],
  border: '1',
});
az.call_multiple({
  iterations: az.hold_value.defects.length,
  function: function (elem, index) {
    az.add_text('tally_layout_cells', index * 3 + 1, {
      this_class: 'defect_title_f',
      text: az.hold_value.defects[index],
    });
    az.all_style_text('defect_title_f', {
      align: 'center',
      'font-size': '20px',
      color: 'var(--typography-primary-default)',
    });
  },
});

$('.section_breaks_s8f90d').remove();

const right = document.querySelector('.my_sections').style.height;
const left = document.querySelector('.navbar').style.height;
if (left > right) {
  document.querySelector('.my_sections').style.height = left;
} else {
  document.querySelector('.navbar').style.height = right;
}
