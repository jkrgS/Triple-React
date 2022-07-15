import React, { useMemo, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { usePrograms } from 'store/ProgramsProvider';
import SearchBar from 'components/shared/SearchBar';
import { programCheckboxes, programColumns } from 'interfaces/IPrograms';
import { debounce } from 'tools/debounce';
import NoDataFound from 'components/shared/NoDataFound';
import { LinearProgressBar } from 'components/shared/ProgressBar';

const Programs = () => {
  // state for checkboxes
  const [checked, setChecked] = useState(programCheckboxes);

  // reference on text input search box for reset
  const searchTextInput = useRef(null);

  // interact on checkbox change
  const { programsList, programsListLoading, emptyResults, getFilteredPrograms } = usePrograms();

  const handleCheckboxChange = (e) => {
    // destruct the event values
    const { id, checked: status } = e.target;

    /* create the updated state, to use for filtering request,
      update the current checkbox & reset the others(only 1 checkbox allowed to be active/filtered)
    */
    const delta = checked.map(
      (checkbox) =>
        checkbox.id === id
          ? {
              ...checkbox,
              status,
            }
          : { ...checkbox, status: false } // reset the others
    );

    // update the state
    setChecked(delta);

    // reset search input
    searchTextInput.current.value = '';

    // trigger the context action of the filtered programs
    getFilteredPrograms('filter', status ? id : '');
  };

  const handleSearchQueryChange = (e) => {
    // destruct the event values
    const { value } = e.target;

    // reset checkboxes
    setChecked(programCheckboxes);

    // trigger the context action of the filtered programs
    getFilteredPrograms('search', value);
  };

  // use a memoization for the debounce of the search box input typing to avoid useless rerendering
  const searchQueryDebouncedResults = useMemo(() => {
    return debounce(handleSearchQueryChange, 500);
  }, []);

  return (
    <>
      <SearchBar
        checked={checked}
        searchRef={searchTextInput}
        handleCheckboxChange={handleCheckboxChange}
        handleSearchQueryChange={searchQueryDebouncedResults}
        disabled={(programsListLoading || !programsList.length) && !emptyResults}
      />
      {!programsListLoading && !emptyResults && !!programsList.length && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {programColumns.map((column, index) => (
                  <TableCell key={index} component="th">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {programsList.map((program) => {
                let formattedDate = '';

                // format the date to locale, if available
                if (program.pause_at) {
                  const date = new Date(program.pause_at);
                  formattedDate = date.toLocaleDateString();
                }

                return (
                  <tr key={program.id}>
                    <TableCell>{program.name}</TableCell>
                    <TableCell>{program.return_percentage}</TableCell>
                    <TableCell>{program.threshold}</TableCell>
                    <TableCell>{program.status}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                  </tr>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!emptyResults && (programsListLoading || !programsList.length) && <LinearProgressBar />}
      {emptyResults && !programsListLoading && !programsList.length && <NoDataFound />}
    </>
  );
};

export default Programs;
