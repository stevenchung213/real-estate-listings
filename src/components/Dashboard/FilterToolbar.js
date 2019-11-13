import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FilterButtonsContainer } from './FilterToolbar.styled';

const FilterToolbar = (props) => {
  const { spanish, handleFilters, handleSpanish } = props;
  const filters = [
    {
      type: 'View All',
      values: null,
    },
    {
      type: 'By Status',
      values: ['HOT Lead', 'Contacted', 'Left Note', 'Done'],
    },
    {
      type: 'Date',
      values: ['Last 30 Days', 'Last 7 Days'],
    },
    {
      type: 'Spanish',
      values: null,
    },
  ];
  return (
    <FilterButtonsContainer id="filter-buttons-container">
      {
        filters.map(filter => (
          filter.type === 'Spanish'
            ? (
              <FormControlLabel
                key={filter.type}
                label="Spanish"
                control={
                  (
                    <Switch
                      checked={spanish}
                      onChange={() => handleSpanish(!spanish)}
                      color="primary"
                      value="spanish"
                    />
                  )
                }
              />
            )
            : (
              <Button
                key={filter.type}
                color="default"
                variant="contained"
                size="small"
                name={filter.type}
              >
                {filter.type}
              </Button>
            )
        ))
      }
    </FilterButtonsContainer>
  );
};

export default FilterToolbar;
