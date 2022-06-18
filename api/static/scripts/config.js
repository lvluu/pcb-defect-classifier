az.read_local_file({
  file_path: '/test_temps/test_temps.json',
  done: function (data) {
    az.hold_value.test_temps = Object.keys(data);
  },
});

az.hold_value.config = {
  api_url: '/function',
};

az.hold_value.defect_cost_totals = {
  spur: [],
  spurious: [],
  short: [],
  mousebite: [],
  open: [],
  pinhole: [],
};

az.hold_value.defects = [
  'SPUR',
  'SPURIOUS',
  'SHORT',
  'PINHOLE',
  'OPEN',
  'MOUSEBITE',
];

az.hold_value.is_upload = false;

