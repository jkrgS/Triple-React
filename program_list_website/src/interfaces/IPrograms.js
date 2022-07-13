// program object
const IProgram = { id: 0, name: '', return_percentage: '', threshold: 0, status: '', pause_at: '' };

// programs list of  program object
const IProgramsList = [IProgram];

// prop types of the searching url params
const IProgramUrlParams = {
  filterType: { search: 'name_like', filter: 'status' },
};

export { IProgramUrlParams, IProgramsList };
