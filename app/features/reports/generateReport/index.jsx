import React, { useState } from 'react';
import FilterItems from './reportFilters/filterItems';
import ReportTable from './reportTable';
import NoReports from '../../../common/components/noReport/noReport';

const GenerateReport = () => {
  const [showTable, setShowTable] = useState({
    show: false,
    tableName: '',
    tableData: [],
    date: null,
    fromDate: null,
    toDate: null,
    totalResults: null
  });
  return (
    <>
      <FilterItems setShowTable={setShowTable} />
      {showTable.show ? <ReportTable showTable={showTable} /> : <NoReports />}
    </>
  );
};

export default GenerateReport;
