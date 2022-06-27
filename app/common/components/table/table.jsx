import React from 'react';
import { Table as ReactTable } from 'reactstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Table = ({
  headers,
  children,
  className,
  responsive,
  bordered,
  nestedHeaders
}) => {
  const buildTableHeader = () => {
    if (nestedHeaders) {
      const tablehead = Object.keys(headers);
      const tableRows = _.map(tablehead, tableHeaderTitle => {
        if (!headers[tableHeaderTitle]) {
          return <th className="table-header-title">{tableHeaderTitle}</th>;
        }
        if (headers[tableHeaderTitle]) {
          const subTable = headers[tableHeaderTitle]?.map(subItem => (
            <th className="table-header-title">{subItem}</th>
          ));
          return (
            <td>
              <tr className="table-header-title">{tableHeaderTitle}</tr>
              <tr className="table-header-title">{subTable}</tr>
            </td>
          );
        }
      });

      return (
        <thead className="report-thead">
          <tr>{tableRows}</tr>
        </thead>
      );
    }
    const tableRows = _.map(headers, tableHeaderTitle => {
      return <th className="table-header-title">{tableHeaderTitle}</th>;
    });

    return (
      <thead className="report-thead">
        <tr>{tableRows}</tr>
      </thead>
    );
  };

  return (
    <ReactTable
      responsive={responsive}
      bordered={bordered}
      className={className}
    >
      {buildTableHeader()}
      {children}
    </ReactTable>
  );
};

Table.defaultProps = {
  headers: [] || {},
  nestedHeaders: false,
  children: null,
  className: '',
  responsive: false,
  bordered: false
};

Table.propTypes = {
  headers: PropTypes.shape([] || {}),
  nestedHeaders: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  responsive: PropTypes.bool,
  bordered: PropTypes.bool
};

export default Table;
