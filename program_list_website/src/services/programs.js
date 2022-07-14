const getPrograms = (uri, method, signal, setData, setLoading, setError) => {
  // fetch the data and pass the signal on the request
  fetch(uri, { signal, method })
    .then((response) => response.json())
    .then((json) => {
      setData(json);
      setLoading(false); // once promise fulfilled, switch loading to false
    })
    .catch((err) => {
      /* 
        on promise rejection 
        (!!!) inn the react development mode the 1st request will run twice, and the 1st will be canceled and raised error
      */
      setError(err);
      setLoading(false); // once promise fulfilled, switch loading to false
    });
};

export { getPrograms };
