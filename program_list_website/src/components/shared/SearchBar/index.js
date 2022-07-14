import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Search = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormGroupContainer = styled(FormGroup)`
  display: block;
`;

const SearchBar = ({
  handleCheckboxChange,
  handleSearchQueryChange,
  checked,
  searchRef,
  disabled,
}) => {
  return (
    <Search>
      <TextField
        id="outlined-basic"
        inputRef={searchRef}
        onInput={handleSearchQueryChange}
        label="Search"
        variant="outlined"
        disabled={disabled}
      />
      <FormGroupContainer>
        {checked.map((checkbox) => (
          <FormControlLabel
            key={checkbox.id}
            control={
              <Checkbox
                id={checkbox.id}
                checked={checkbox.status}
                onChange={handleCheckboxChange}
                inputProps={{ 'arial-label': 'checkbox' }}
                style={{ width: '30px', height: '30px' }}
                disabled={disabled}
              />
            }
            label={checkbox.label}
          />
        ))}
      </FormGroupContainer>
    </Search>
  );
};

export default SearchBar;
