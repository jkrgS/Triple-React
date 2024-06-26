import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const NoDataFound = () => {
  return <Container data-testid="no-data-found-element">No Data Found</Container>;
};

export default NoDataFound;
