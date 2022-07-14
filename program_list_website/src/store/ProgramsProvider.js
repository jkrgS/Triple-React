import { IProgramContext } from 'interfaces/IContext';
import { createContext, useContext, useState, useEffect } from 'react';
import { getPrograms } from 'services/programs';

// crete the context - w/ default values from interface
const ProgramContext = createContext(IProgramContext);

// provide a custom hook to access the context
const usePrograms = () => useContext(ProgramContext);

const ProgramProvider = ({ children }) => {
  // initial provider state - w/ default values from an interface
  const [programsList, setProgramsList] = useState([]);
  const [uri, setUri] = useState(process.env.REACT_APP_SERVER_DOMAIN);
  const [programsListLoading, setProgramsListLoading] = useState(true); // store the loading, by default true
  const [emptyResults, setEmptyResults] = useState(false); // store the loading, by default true
  const [error, setError] = useState(null); // store the error

  // pass to fetch the desired domain to serve the proper data(all programs & filtered ones)
  const getFilteredPrograms = (filterType, value = '') => {
    let mainUri = process.env.REACT_APP_SERVER_DOMAIN;

    if (value.length) {
      // eslint-disable-next-line default-case
      switch (filterType) {
        case 'search':
          mainUri += `?name_like=${value}`;
          break;
        case 'filter':
          mainUri += `?status=${value}`;
          break;
      }
    }

    setUri(mainUri);
  };

  useEffect(() => {
    // reset state values
    setProgramsListLoading(true);
    setEmptyResults(false);
    setError(null);

    // use controller object
    const controller = new AbortController();
    // the signal property used to communicate with/abort a DOM request
    const { signal } = controller;

    getPrograms(
      uri,
      'GET',
      signal,
      setProgramsList,
      setProgramsListLoading,
      setEmptyResults,
      setError
    );

    return () => {
      controller.abort(); // abort on the use effect cleanup, to avoid memory leaks for multiple requests
    };
  }, [uri]);

  return (
    <ProgramContext.Provider
      value={{ programsList, programsListLoading, emptyResults, getFilteredPrograms, error }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

// export the custom hook
export { usePrograms };

// export the provider
export default ProgramProvider;
