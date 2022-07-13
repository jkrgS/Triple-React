import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { usePrograms } from 'store/ProgramsProvider';
import SearchBar from 'components/shared/SearchBar';
import { IProgramCheckboxes } from 'interfaces/IPrograms';

const Programs = () => {
  // state for checkboxes
  const [checked, setChecked] = useState(IProgramCheckboxes);
  // state for searching query
  const [searchQuery, setSearchQuery] = useState('');
  // interact on checkbox change
  const { programsList, programsListLoading, getFilteredPrograms } = usePrograms();

  useEffect(() => {
    getFilteredPrograms(searchQuery);
  }, [searchQuery, getFilteredPrograms]);

  const handleChange = (e) => {
    // destruct the event values
    const { id, checked: status } = e.target;

    // update the current checkbox & reset the others(only 1 checkbox allowed to be active/filtered)
    setChecked((prev) =>
      prev.map((checkbox) =>
        checkbox.id === id
          ? {
              ...checkbox,
              status,
            }
          : { ...checkbox, status: false }
      )
    );
  };

  if (programsListLoading || !programsList) {
    return <div>Loading</div>;
  }

  return (
    <>
      <SearchBar handleChange={handleChange} checked={checked} setSearchQuery={setSearchQuery} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">Name</TableCell>
              <TableCell component="th">Cashback</TableCell>
              <TableCell component="th">Threshold</TableCell>
              <TableCell component="th">Status</TableCell>
              <TableCell component="th">Pause Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programsList.map((program) => (
              <tr key={program.id}>
                <TableCell>{program.name}</TableCell>
                <TableCell>{program.return_percentage}</TableCell>
                <TableCell>{program.threshold}</TableCell>
                <TableCell>{program.status}</TableCell>
                <TableCell>{program.pause_at}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Programs;
