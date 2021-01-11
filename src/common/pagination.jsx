import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const Pagination = props => {
  const { itemCount, pageSize, currentPage, onPageChanged } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              href="#"
              aria-disabled="true"
              onClick={() => onPageChanged(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChanged: propTypes.func.isRequired
};
export default Pagination;
