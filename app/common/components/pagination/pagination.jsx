import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Select from '../select/select';

const buildOption = x => ({ value: x, label: x });

const CommonPagination = props => {
  const { page, setPage, totalResults, limit, setLimit, limitOptions } = props;
  const [pageValue, setPageValue] = useState(page);
  const perPageOptions = limitOptions.length ? limitOptions : [5, 10, 15];
  const numPages = Math.ceil(totalResults / limit);
  const showingResultsFrom = (page - 1) * limit + 1;
  const showingResultsTo = Math.min(page * limit, totalResults);

  // set the page value on limit change
  useEffect(() => setPageValue(page), [page, limit]);

  return (
    <div className="pagination-section">
      <span className="pagination-label">Showing rows:</span>
      <div className="per-page">
        <Select
          size="sm"
          formInput={false}
          options={perPageOptions.map(buildOption)}
          value={buildOption(perPageOptions.find(x => x === limit))}
          isSearchable={false}
          onChange={option => {
            setPage(1);
            setLimit(option.value);
          }}
        />
      </div>
      <div className="per-page">
        <span className="pagination-label">Page:</span>
        <span>
          <input
            size="xs"
            value={pageValue}
            onChange={e => {
              const { value } = e.target;
              setPageValue(value);
            }}
            className={
              totalResults && (pageValue > numPages || pageValue <= 0)
                ? 'border-input'
                : 'input-field'
            }
            onKeyPress={e => {
              if (e.key === 'Enter' && pageValue <= numPages && pageValue > 0) {
                e.preventDefault();
                setPage(Number(pageValue));
              }
            }}
          />
          {` of ${isNaN(numPages) ? 0 : numPages}`}
          <span className="records-page">
            {showingResultsFrom} -
            {` ${isNaN(showingResultsTo) ? 0 : showingResultsTo}`}
            {` of ${isNaN(totalResults) ? 0 : totalResults}`}
          </span>
        </span>
      </div>
      <Pagination size="sm">
        <PaginationItem disabled={page === 1}>
          <PaginationLink
            previous
            onClick={e => {
              e.preventDefault();
              setPage(Number(page) - 1);
              setPageValue(Number(page) - 1);
            }}
            disabled={page === 1}
          />
        </PaginationItem>
        <PaginationItem disabled={page === numPages || numPages === 0}>
          <PaginationLink
            next
            onClick={e => {
              e.preventDefault();
              setPage(Number(page) + 1);
              setPageValue(Number(page) + 1);
            }}
            disabled={page === numPages || numPages === 0}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

CommonPagination.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setLimit: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  limitOptions: PropTypes.arrayOf(PropTypes.number)
};
CommonPagination.defaultProps = {
  limitOptions: []
};

export default CommonPagination;
