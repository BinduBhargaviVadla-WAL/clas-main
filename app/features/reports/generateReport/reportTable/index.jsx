import React from 'react';
import { components } from '../../../../utils/components';

const ReportTable = ({ showTable }) => {
  const Component =
    components[showTable?.tableName] &&
    components[showTable?.tableName].component;

  return (
    Component && (
      <Component
        tableData={showTable?.tableData}
        date={showTable?.date}
        totalResults={showTable?.totalResults}
        fromDate={showTable?.fromDate}
        toDate={showTable?.toDate}
      />
    )
  );
};

export default ReportTable;
