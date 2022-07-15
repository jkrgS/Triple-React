import { IProgramUrlParams } from './IPrograms';

// default values for the programs context as interface
const IProgramContext = {
  getFilteredPrograms: (filterType = IProgramUrlParams.filterType, value = '') => {},
};

export { IProgramContext };
