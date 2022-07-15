// define the table columns
const programColumns = ['Name', 'Cashback', 'Threshold', 'Status', 'Pause Date'];

// prop types of the searching url params
const programCheckboxes = [
  { id: 'ACTIVE', label: 'Active', status: false },
  { id: 'PAUSED', label: 'Paused', status: false },
  { id: 'PAUSE_SCHEDULED', label: 'Pause Scheduled', status: false },
];

// prop types of the searching url params
const IProgramUrlParams = {
  filterType: null,
  value: '',
};

export { IProgramUrlParams, programCheckboxes, programColumns };
