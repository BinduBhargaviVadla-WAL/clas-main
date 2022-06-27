/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Table, Loader, Pagination } from '../../../../../common/components';
import { usePagination } from '../../../../../common/hooks/data';
import { getReportData, getTotalCount } from '../../../../../api/reports';
import Toolbar from '../../../toolbar/toolbar';
import ItemEmptyTile from '../../../item-empty-tile/item-empty-tile';
import DownloadModal from '../../../downloadModal/downloadModal';
import EmailModal from '../../../emailModal/emailModal';
import InterestAndFinancebyCustomerReportTableRow from './interestAndFinancebyCustomerReportTableRow';
import * as handlers from '../../../../../utils/handlers';

const InterestAndFinancebyCustomerReportTable = ({
  tableData,
  totalResults,
  fromDate,
  toDate
}) => {
  const [
    interestAndFinanceTableData,
    setInterestAndFinanceTableData
  ] = useState([]);
  const { page, limit, setPage, setLimit } = usePagination();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [slStartNumber, setSlStartNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const toggleEmailModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen(!isDownloadModalOpen);
  };

  let addtionalTableColumns = [];
  if (tableData[0]?.service[0]?.timePeriods) {
    addtionalTableColumns = Object.keys(tableData[0]?.service[0]?.timePeriods);
  }

  const tableColumns = [
    'SL.NO.',
    'PURCHASER NAME',
    'BUSINESS UNIT',
    'OPENING BALANCE',
    ...addtionalTableColumns,
    'BALANCE PERIOD',
    'CLOSING BALANCE',
    'CLOSING DATE'
  ];

  useEffect(() => {
    setSlStartNumber(page * limit - limit);
    if (applyFilters) {
      getUpdatedTableData('pagination');
    }
  }, [page, limit]);

  const getUpdatedTableData = async (type = 'pagination', value = '') => {
    setLoading(true);
    setApplyFilters(false);
    const requestParams = {
      fromDate,
      toDate,
      page,
      limit,
      ...((type === 'search' || searchText.length > 0) && {
        opiOrName: type === 'search' ? value : searchText
      })
    };
    try {
      const { data } = await getReportData(
        'interestAndFinancebyCustomer',
        requestParams
      );
      if (type === 'search') {
        setPage(1);
        setLimit(5);
        const response = await getTotalCount('interestAndFinancebyCustomer', {
          fromDate,
          toDate,
          opiOrName: value
        });
        setTotalCount(response?.data?.data?.totalResult);
      }
      if (data?.data) {
        setInterestAndFinanceTableData(data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handlers.apiErrorHandler(error);
    }
  };

  const debounceApiCall = useCallback(
    debounce(val => {
      getUpdatedTableData('search', val);
    }, 2000),
    []
  );

  const onSerchInputChange = event => {
    const {
      target: { value }
    } = event;
    setSearchText(value);
    debounceApiCall(value);
  };

  useEffect(() => {
    if (tableData?.length > 0) {
      setInterestAndFinanceTableData(tableData);
      setTotalCount(totalResults);
      setPage(1);
      setLimit(5);
      setSearchText('');
    }
  }, [tableData]);

  return (
    <>
      <Toolbar
        title="Interest & Finance by Customer"
        optionOneLabel="Email Report"
        optionOneIcon="MdOutlineEmail"
        onOptionOneClick={toggleEmailModal}
        optionTwoLabel="Download Report"
        optionTwoIcon="FiDownload"
        onOptionTwoClick={toggleDownloadModal}
        searchText={searchText}
        onSerchInputChange={onSerchInputChange}
        isSearchable
        SearchInputPlaceholder="Search Using OPI Number or Contract Number"
      />
      {interestAndFinanceTableData &&
      interestAndFinanceTableData?.length > 0 ? (
        <>
          <Table
            headers={tableColumns}
            bordered
            responsive
            className="dashboard-table"
          >
            <tbody>
              {interestAndFinanceTableData?.map((rowData, rowNumber) => (
                <InterestAndFinancebyCustomerReportTableRow
                  rowData={rowData}
                  id={slStartNumber + rowNumber + 1}
                />
              ))}
            </tbody>
            {loading && <Loader />}
          </Table>

          <div className="pagination-araging-report">
            <Pagination
              totalResults={totalCount}
              page={page}
              limit={limit}
              setPage={pageNo => {
                setApplyFilters(true);
                setPage(pageNo);
              }}
              setLimit={rowlimit => {
                setApplyFilters(true);
                setLimit(rowlimit);
              }}
            />
          </div>
        </>
      ) : (
        <ItemEmptyTile />
      )}

      <EmailModal
        isOpen={isEmailModalOpen}
        toggle={toggleEmailModal}
        reportType="interestAndFinancebyCustomer"
        apiValues={{ fromDate, toDate }}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        toggle={toggleDownloadModal}
        reportType="interestAndFinancebyCustomer"
        urlParams={{ fromDate, toDate, page, limit: 200 }}
      />
    </>
  );
};

export default InterestAndFinancebyCustomerReportTable;
