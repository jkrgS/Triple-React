// program object
const IProgram = { id: 0, name: '', return_percentage: '', threshold: 0, status: '', pause_at: '' };

// programs list of  program object
const IProgramsList = [IProgram];

// prop types of the searching url params
const IProgramUrlParams = {
  filterType: null,
  value: '',
};

// prop types of the searching url params
const IProgramCheckboxes = [
  { id: 'Active', status: false },
  { id: 'Paused', status: false },
  { id: 'Pause_Scheduled', status: false },
];

export { IProgramUrlParams, IProgramsList, IProgramCheckboxes };
