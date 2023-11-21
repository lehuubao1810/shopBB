import { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

export default function HalfRating({ onChangeRating}) {
  const [rating, setRating] = useState(2.5);

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={rating}
        precision={0.5}
        onChange={(event, newValue) => {
          setRating(newValue);
          onChangeRating(newValue);
        }}
        value={rating}
      />
    </Stack>
  );
}

HalfRating.propTypes = {
  onChangeRating: PropTypes.func,
};
