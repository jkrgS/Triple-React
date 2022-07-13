import useFetch from 'hooks/useFetch';
import { IProgramContext } from 'interfaces/IContext';
import { IProgramsList, IProgramUrlParams } from 'interfaces/IPrograms';
import { createContext, useContext, useState, useEffect } from 'react';

// crete the context - w/ default values from interface
const ProgramContext = createContext(IProgramContext);

// provide a custom hook to access the context
const usePrograms = () => useContext(ProgramContext);

const ProgramProvider = ({ children }) => {
  // initial provider state - w/ default values from an interface
  const [programsList, setProgramsList] = useState(IProgramsList);
  const [uri, setUri] = useState(process.env.REACT_APP_SERVER_DOMAIN);

  // pass to the custom hook the desired domain to serve the proper data(all programs)
  // const { data, loading: programsListLoading } = useFetch(process.env.REACT_APP_SERVER_DOMAIN);

  const { data, loading: programsListLoading } = useFetch(uri);

  const getFilteredPrograms = (filterType, value = '') => {
    if (value.length) {
      setUri(
        `${process.env.REACT_APP_SERVER_DOMAIN}${
          filterType === 'search' ? '?name_like=' : 'status='
        }${value}`
      );
    } else setUri(process.env.REACT_APP_SERVER_DOMAIN);
  };

  // listen on the fetching completion(programsListLoading stands for the time that the promise takes to resolve)
  useEffect(() => {
    if (!programsListLoading) setProgramsList(data);
  }, [programsListLoading, data]);

  return (
    <ProgramContext.Provider value={{ programsList, programsListLoading, getFilteredPrograms }}>
      {children}
    </ProgramContext.Provider>
  );
};

// export the custom hook
export { usePrograms };

// export the provider
export default ProgramProvider;
