import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FilterButtonContainer, FilterButtonsContainer } from './FilterToolbar.styled';

const FilterToolbar = (props) => {
  const {
    activeFilters, spanish, handleSpanish, handleByStatus, handleByDate, handleViewAll,
  } = props;
  const { filtersOn, status, date } = activeFilters;
  console.log(date)
  return (
    <FilterButtonsContainer id="filter-buttons-container">
      <FilterButtonContainer>
        <Button
          color="default"
          variant="contained"
          size="small"
          fullWidth
          onClick={handleViewAll}
          disabled={status === 'By Status' && date === 'By Date'}
        >
        View All
        </Button>
      </FilterButtonContainer>
      <FilterButtonContainer>
        <Button
          color="default"
          variant="contained"
          size="small"
          fullWidth
          onClick={handleByStatus}
        >
          {status}
        </Button>
      </FilterButtonContainer>
      <FilterButtonContainer>
        <Button
          color="default"
          variant="contained"
          size="small"
          fullWidth
          onClick={handleByDate}
        >
          {date}
        </Button>
      </FilterButtonContainer>
      <FormControlLabel
        label="Spanish"
        control={
          (
            <Switch
              checked={spanish}
              onClick={() => {
                handleSpanish(!spanish);
              }}
              color="primary"
            />
          )
        }
      />
    </FilterButtonsContainer>
  );
};

export default FilterToolbar;
