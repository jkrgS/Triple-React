import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

export const LinearProgressBar = () => {
  return (
    <Container>
      <LinearProgress data-testid="linear-progress-bar-element" />
    </Container>
  );
};

export default LinearProgress;
