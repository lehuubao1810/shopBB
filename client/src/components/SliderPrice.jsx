import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";

import formatPrice from "../util/formatPrice";

export default function SliderPrice({ slug, handleFilterPrice }) {
  const [value, setValue] = useState([0, 120000000]);


  const handleChange = (e, newValue) => {
    setValue(newValue);
    handleFilterPrice(slug, newValue);
    // console.log(newValue);
  };

  return (
    <Box sx={{ width: 300, marginTop: 4, marginLeft: 2 }}>
      <Slider
        // getAriaLabel={() => 'Temperature range'}
        value={value}
        step={100000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        max={120000000}
      />
      <p>
        Khoảng giá: {formatPrice(value[0])} - {formatPrice(value[1])}
      </p>
    </Box>
  );
}

SliderPrice.propTypes = {
  handleFilterPrice: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};
