import PropTypes from "prop-types";

export default function Modal({ title, handleCloseModal, handle }) {
  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h4>{title}</h4>
        <div className="modal__content__buttons">
          <button onClick={handleCloseModal}>Không</button>
          <button onClick={handle}>Có</button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  handleCloseModal: PropTypes.func,
  handle: PropTypes.func,
};
