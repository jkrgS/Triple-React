import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import AppHeader from 'components/AppHeader';
import { Navigate, Route, Routes } from 'react-router-dom';

// add the programs component as a lazy loading
const Programs = React.lazy(() => {
  return import('./pages/Programs');
});

const App = () => {
  const routes = (
    <Routes>
      <Route path="programs" element={<Programs />} />
      <Route path="*" element={<Navigate to="programs" />} />
    </Routes>
  );
  return (
    <>
      <AppHeader />
      <Container component="main" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Suspense>{routes}</Suspense>
      </Container>
    </>
  );
};

export default App;
