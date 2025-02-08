import {
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  GENDER_OPTIONS,
  NATIONALITY_OPTIONS,
} from '../constants/formFieldOptions';
import React from 'react';

/*
The presentation component for handling the Requesting Users Form. 
*/
const FilterForm = React.memo(
  ({
    genders,
    setGenders,
    nationalities,
    setNationalities,
    numberOfUsers,
    setNumberOfUsers,
    handleSubmit,
  }) => {
    return (
      <form onClick={handleSubmit}>
        <Box
          display='flex'
          flexWrap='wrap'
          alignItems='stretch'
          gap={2}
          sx={{
            width: '100%',
            '@media (max-width: 500px)': {
              flexDirection: 'column',
              gap: 1,
            },
          }}>
          <FormControl>
            <TextField
              label='Number of Users'
              type='number'
              value={numberOfUsers}
              onChange={(e) => setNumberOfUsers(e.target.value)}
              style={{ marginRight: '10px' }}
            />
          </FormControl>

          <FormControl sx={{ minWidth: '20%' }}>
            <InputLabel id='genders-picker'>Genders</InputLabel>
            <Select
              labelId='genders-picker'
              multiple
              value={genders}
              onClick={(e) => e.preventDefault()}
              onChange={(event) => {
                const value = event.target.value;

                if (JSON.stringify(value) === JSON.stringify(genders)) return; // ✅ Prevent redundant state update

                setGenders(value);
              }}>
              {GENDER_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: '30%' }}>
            <InputLabel id='nationalities-picker'>Nationalities</InputLabel>
            <Select
              labelId='nationalities-picker'
              multiple
              value={nationalities}
              onChange={(e) => setNationalities(e.target.value)}>
              {NATIONALITY_OPTIONS.map((nat) => (
                <MenuItem key={nat} value={nat}>
                  {nat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant='contained' color='primary' type='submit'>
            Search
          </Button>
        </Box>
      </form>
    );
  }
);

FilterForm.displayName = 'FilterForm';

export default FilterForm;
