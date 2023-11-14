import { useState } from "react";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

export default function FilterAutoWidth({
  slug,
  name,
  options,
  handleFilter,
  sortPrice,
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const valueParam = searchParams.get(slug) || "";
  const [value, setValue] = useState(valueParam);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilter(slug, e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{name}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="value"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Không lựa chọn</em>
        </MenuItem>
        {options
          ? options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))
          : sortPrice.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}

FilterAutoWidth.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  sortPrice: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
