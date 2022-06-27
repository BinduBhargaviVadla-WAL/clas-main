/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Table, Pagination, Loader } from '../../../../../common/components';
import PayOffReportRow from './PayOffReportRow';
import { getReportData, getTotalCount } from '../../../../../api/reports';
import { usePagination } from '../../../../../common/hooks/data';
import Toolbar from '../../../toolbar/toolbar';
import ItemEmptyTile from '../../../item-empty-tile/item-empty-tile';
import EmailModal from '../../../emailModal/emailModal';
import DownloadModal from '../../../downloadModal/downloadModal';
import * as handlers from '../../../../../utils/handlers';

const PayOffReport = ({ tableData, fromDate, toDate, totalResults }) => {
  const [payOffTableData, setPayOffTableData] = useState([]);
  const { page, limit, setPage, setLimit } = usePagination();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [slStartNumber, setSlStartNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const tableColumns = {
    'SL. NO.': null,
    'purchaser Name': null,
    'Due date': null,
    'payment date': null,
    Services: null,
    Statements: Object.keys(tableData[0].service[0].timePeriod)
  };

  useEffect(() => {
    setSlStartNumber(page * limit - limit);
    if (applyFilters) {
      getUpdatedTableData('pagination');
    }
  }, [page, limit]);

  const toggleEmailModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen(!isDownloadModalOpen);
  };

  const getUpdatedTableData = async (type = 'pagination', value = '') => {
    setLoading(true);
    setApplyFilters(false);
    const requestParams = {
      startDate: fromDate,
      endDate: toDate,
      page,
      limit,
      ...((type === 'search' || searchText.length > 0) && {
        opiOrName: type === 'search' ? value : searchText
      })
    };
    try {
      const { data } = await getReportData('payOffReport', requestParams);
      if (type === 'search') {
        setPage(1);
        setLimit(5);
        const response = await getTotalCount('payOffReport', {
          startDate: fromDate,
          endDate: toDate,
          opiOrName: value
        });
        setTotalCount(response?.data?.data?.totalCount);
      }
      if (data?.data?.items) {
        setPayOffTableData(data.data.items);
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
      setPayOffTableData(tableData);
      setTotalCount(totalResults);
      setPage(1);
      setLimit(5);
      setSearchText('');
    }
  }, [tableData]);

  return (
    <>
      <Toolbar
        title="Pay Off Report"
        optionOneLabel="Email Report"
        optionOneIcon="MdOutlineEmail"
        onOptionOneClick={toggleEmailModal}
        optionTwoLabel="Download Report"
        optionTwoIcon="FiDownload"
        setSearchText={setSearchText}
        onOptionTwoClick={toggleDownloadModal}
        searchText={searchText}
        onSerchInputChange={onSerchInputChange}
        isSearchable
      />
      {payOffTableData && payOffTableData?.length > 0 ? (
        <>
          <div className="table-resp-scroll">
            <Table
              headers={tableColumns}
              nestedHeaders
              bordered
              responsive
              className="dashboard-table"
            >
              <tbody>
                {payOffTableData?.map((rowData, rowNumber) => (
                  <PayOffReportRow
                    rowData={rowData}
                    id={slStartNumber + rowNumber + 1}
                    nestedColumnsNumber={Object.keys(tableColumns)?.length - 4}
                  />
                ))}
              </tbody>
              {loading && <Loader />}
            </Table>
          </div>

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
        reportType="payOffReport"
        apiValues={{ startDate: fromDate, endDate: toDate }}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        toggle={toggleDownloadModal}
        reportType="payOffReport"
        urlParams={{ startDate: fromDate, endDate: toDate, page, limit: 200 }}
      />
    </>
  );
};

export default PayOffReport;
