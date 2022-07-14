import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

export const LinearProgressBar = () => {
  return (
    <Container>
      <LinearProgress />
    </Container>
  );
};

export default LinearProgress;
