import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { ProgramContext } from '../../store/ProgramsProvider';
import Programs from '.';

describe('test of <Programs />', () => {
  // provide a function that renders dynamically the component wrapped from context provider with the proper values
  const renderPrograms = (programsList = [], programsListLoading = false, emptyResults = false) => {
    render(
      <ProgramContext.Provider value={{ programsList, programsListLoading, emptyResults }}>
        <Programs />
      </ProgramContext.Provider>
    );
  };
  test('should display linear progress bar on programsListLoading', async () => {
    renderPrograms();

    const linearSpinnerEl = await screen.findByTestId('linear-progress-bar-element');

    expect(linearSpinnerEl).toBeInTheDocument();
  });

  test('should display data in the table', () => {
    const programsList = [
      {
        id: 1,
        name: 'DIA',
        return_percentage: '5%',
        threshold: 1200,
        currency: 'EUR',
        status: 'ACTIVE',
        pause_at: null,
      },
    ];

    renderPrograms(programsList);

    const tableRowNameEl = screen.getByRole('row', { name: /dia/i });

    expect(tableRowNameEl).toBeInTheDocument();
  });

  test('should display no data found in case of empty results', async () => {
    renderPrograms([], false, true);

    const noDataFoundEl = await screen.findByTestId('no-data-found-element');

    expect(noDataFoundEl).toBeInTheDocument();
  });
});
