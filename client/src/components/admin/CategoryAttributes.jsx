import PropTypes from "prop-types";
// import { useState } from "react";

export default function CategoryAttributes({
  categoryAttributes,
  setCategoryAttributes,
  isEdit,
}) {
  const handleAddAttribute = () => {
    const newAttributes = [...categoryAttributes];
    newAttributes.push({
      name: "",
      slug: "",
      options: [],
    });
    setCategoryAttributes(newAttributes);
  };

  return (
    <div className="categoryAttributes">
      <div className="categoryAttributes__header">
        <div className="categoryAttributes__header__item">
          <p>Tên thuộc tính</p>
        </div>
        <div className="categoryAttributes__header__item">
          <p>Slug</p>
        </div>
        <div className="categoryAttributes__header__item">
          <p>Giá trị</p>
        </div>
      </div>
      <div className="categoryAttributes__body">
        {categoryAttributes.map((attribute, index) => (
          <div className="categoryAttributes__body__item" key={index}>
            <input
              type="text"
              value={attribute.name}
              onChange={(e) => {
                const newAttributes = [...categoryAttributes];
                newAttributes[index].name = e.target.value;
                setCategoryAttributes(newAttributes);
              }}
              disabled={!isEdit}
            />
            <input
              type="text"
              value={attribute.slug}
              onChange={(e) => {
                const newAttributes = [...categoryAttributes];
                newAttributes[index].slug = e.target.value;
                setCategoryAttributes(newAttributes);
              }}
              disabled={!isEdit}
            />
            <input
              type="text"
              value={attribute.options.join(", ")}
              onChange={(e) => {
                const newAttributes = [...categoryAttributes];
                newAttributes[index].options = e.target.value.split(", ");
                setCategoryAttributes(newAttributes);
              }}
              disabled={!isEdit}
            />
            {isEdit && (
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  const newAttributes = [...categoryAttributes];
                  newAttributes.splice(index, 1);
                  setCategoryAttributes(newAttributes);
                }}
              ></i>
            )}
          </div>
        ))}
      </div>
      <div className="categoryAttributes__footer">
        {isEdit && (
          <button
            className="categoryAttributes__footer__btn"
            onClick={handleAddAttribute}
          >
            Thêm thuộc tính
          </button>
        )}
      </div>
    </div>
  );
}

CategoryAttributes.propTypes = {
  categoryAttributes: PropTypes.array.isRequired,
  setCategoryAttributes: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};
