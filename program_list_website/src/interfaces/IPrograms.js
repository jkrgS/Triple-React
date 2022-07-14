// prop types of the searching url params
const IProgramUrlParams = {
  filterType: null,
  value: '',
};

// prop types of the searching url params
const IProgramCheckboxes = [
  { id: 'ACTIVE', label: 'Active', status: false },
  { id: 'PAUSED', label: 'Paused', status: false },
  { id: 'PAUSE_SCHEDULED', label: 'Pause Scheduled', status: false },
];

export { IProgramUrlParams, IProgramCheckboxes };
