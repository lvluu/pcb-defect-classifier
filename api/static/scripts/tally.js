function add_tally(types) {
  if (types.type == 'spur') {
    az.add_html('tally_layout_cells', 2, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.spur++;
    az.empty_contents('tally_layout_cells', 3);
    az.add_text('tally_layout_cells', 3, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.spur,
    });
  }
  if (types.type == 'spurious') {
    az.add_html('tally_layout_cells', 5, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.spurious++;
    az.empty_contents('tally_layout_cells', 6);
    az.add_text('tally_layout_cells', 6, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.spurious,
    });
  }
  if (types.type == 'short') {
    az.add_html('tally_layout_cells', 8, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.short++;
    az.empty_contents('tally_layout_cells', 9);
    az.add_text('tally_layout_cells', 9, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.short,
    });
  }
  if (types.type == 'pinhole') {
    az.add_html('tally_layout_cells', 11, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.pinhole++;
    az.empty_contents('tally_layout_cells', 12);
    az.add_text('tally_layout_cells', 12, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.pinhole,
    });
  }
  if (types.type == 'open') {
    az.add_html('tally_layout_cells', 14, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.open++;
    az.empty_contents('tally_layout_cells', 15);
    az.add_text('tally_layout_cells', 15, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.open,
    });
  }
  if (types.type == 'mousebite') {
    az.add_html('tally_layout_cells', 17, {
      html: "<div class='added_tally'></div>",
    });
    az.hold_value.defect_cost_totals.mousebite++;
    az.empty_contents('tally_layout_cells', 18);
    az.add_text('tally_layout_cells', 18, {
      this_class: 'defect_cost',
      text: az.hold_value.defect_cost_totals.mousebite,
    });
  }
  az.all_style_html('added_tally', {
    width: '20px',
    height: '20px',
    background: 'var(--iconography-interactive-primary-rhubarb-default)',
    margin: '3px',
    display: 'inline-block',
  });
  az.all_style_text('defect_cost', {
    align: 'center',
    'font-size': '20px',
    color: 'var(--typography-primary-default)',
  });
}
