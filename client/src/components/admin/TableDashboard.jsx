import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import formatPrice from "../../utils/formatPrice";

export default function TableDashboard({ header, data, type }) {
  const navigate = useNavigate();

  return (
    <div className="tableDashboard">
      <div className="tableDashboard__header">
        {header.map((item, index) => (
          <div className="tableDashboard__header__item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="tableDashboard__body">
        {type === "order" &&
          data.map((item, index) => (
            <div className="tableDashboard__body__row" key={index}
            onClick={() => navigate(`/admin/orders/${item._id}`)}
            >
              <div className="tableDashboard__body__row__item">
                {item.customer.name}
              </div>
              <div className="tableDashboard__body__row__item">{item._id}</div>
              <div className="tableDashboard__body__row__item">
                {formatPrice(item.total)}
              </div>
              <div className="tableDashboard__body__row__item">
                {item.status.toUpperCase()}
              </div>
              <div className="tableDashboard__body__row__item">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        {type === "product" &&
          data.map((item, index) => (
            <div
              className="tableDashboard__body__row"
              key={index}
              onClick={() => navigate(`/admin/products/${item._id}`)}
            >
              <div className="tableDashboard__body__row__item">{item.name}</div>
              <div className="tableDashboard__body__row__item">
                {formatPrice(item.price)}
              </div>
              <div className="tableDashboard__body__row__item">{`${
                (item.discount * 100).toFixed(0) || 0
              }%`}</div>
              <div className="tableDashboard__body__row__item">
                {item.sold || 0}
              </div>
              <div className="tableDashboard__body__row__item">
              {item.quantity || 0}
              </div>
            </div>
          ))}
        {type === "category" &&
          data.map((item, index) => (
            <div
              className="tableDashboard__body__row"
              key={index}
              onClick={() => navigate(`/admin/categories/${item._id}`)}
            >
              <div className="tableDashboard__body__row__item">{item.name}</div>
              <div className="tableDashboard__body__row__item">{item.slug}</div>
              <div className="tableDashboard__body__row__item">
                {item.products?.length || 0}
              </div>
              <div className="tableDashboard__body__row__item">
                {item.attributes?.length || 0}
              </div>
              <div className="tableDashboard__body__row__item">
                {new Date(item.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {type === "user" &&
          data.map((item, index) => (
            <div
              className="tableDashboard__body__row"
              key={index}
              onClick={() => navigate(`/admin/users/${item._id}`)}
            >
              <div className="tableDashboard__body__row__item">{item.name}</div>
              <div className="tableDashboard__body__row__item">{item.email}</div>
              <div className="tableDashboard__body__row__item">
                {item.orders?.length || 0}
              </div>
              <div className="tableDashboard__body__row__item">
                {item.reviews?.length || 0}
              </div>
              <div className="tableDashboard__body__row__item">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

TableDashboard.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
};
