import { useEffect, useState } from 'react';

const useFetch = (uri, initialValue = null) => {
  const [data, setData] = useState(initialValue); // store the data of the request
  const [loading, setLoading] = useState(true); // store the loading, by default true
  const [error, setError] = useState(null); // store the error

  useEffect(() => {
    setLoading(true);
    setError(null);

    // use controller object
    const controller = new AbortController();
    // the signal property used to communicate with/abort a DOM request
    const { signal } = controller;

    // fetch the data and pass the signal on the request
    fetch(uri, { signal })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false); // once promise fulfilled, switch loading to false
      })
      .catch((err) => {
        // on promise rejection
        setError(err);
        setLoading(false);
      });
    console.log('abort');
    return () => {
      controller.abort(); // abort on the use effect cleanup, to avoid memory leaks for multiple requests
    };
  }, [uri]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
