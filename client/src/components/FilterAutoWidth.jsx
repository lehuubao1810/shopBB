import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';


export default function FilterAutoWidth({slug, name, handleFilter}) {
  const [age, setAge] = React.useState('');

  const handleChange = (e) => {
    setAge(e.target.value);
    handleFilter(slug, e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{name}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

FilterAutoWidth.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};