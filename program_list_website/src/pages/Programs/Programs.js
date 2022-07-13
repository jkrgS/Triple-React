import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { usePrograms } from 'store/ProgramsProvider';
const Programs = () => {
  const { programsList, programsListLoading } = usePrograms();

  if (programsListLoading || !programsList) {
    return <div>Loading</div>;
  }

  return (
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
  );
};

export default Programs;
