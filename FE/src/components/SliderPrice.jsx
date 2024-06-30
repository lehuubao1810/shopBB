import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import formatPrice from "../utils/formatPrice";

export default function SliderPrice({ handleFilterPrice }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 120000000;

  const [value, setValue] = useState([minPrice, maxPrice]);


  const handleChange = (e, newValue) => {
    setValue(newValue);
    handleFilterPrice(newValue);
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
};
