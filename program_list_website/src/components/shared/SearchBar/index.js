import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormGroupContainer = styled(FormGroup)`
  display: block;
`;

const SearchBar = ({ handleChange, checked, setSearchQuery }) => {
  return (
    <Search>
      <TextField
        id="outlined-basic"
        onInput={(e) => setSearchQuery(e.target.value)}
        label="Search"
        variant="outlined"
      />
      <FormGroupContainer>
        {checked.map((checkbox) => (
          <FormControlLabel
            key={checkbox.id}
            control={
              <Checkbox
                id={checkbox.id}
                checked={checkbox.status}
                onChange={handleChange}
                inputProps={{ 'arial-label': 'checkbox' }}
                style={{ width: '30px', height: '30px' }}
              />
            }
            label={checkbox.id}
          />
        ))}
      </FormGroupContainer>
    </Search>
  );
};

export default SearchBar;
