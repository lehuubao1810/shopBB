import PropTypes from "prop-types";

export default function LoadingSpin({size}) {
  return (
    <div className="follow-the-leader" 
    style={{width: size, height: size}}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

LoadingSpin.propTypes = {
  size: PropTypes.string.isRequired,
};
