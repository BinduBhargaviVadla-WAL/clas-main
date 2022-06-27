/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Table, Pagination, Loader } from '../../../../../common/components';
import { getReportData, getTotalCount } from '../../../../../api/reports';
import { usePagination } from '../../../../../common/hooks/data';
import Toolbar from '../../../toolbar/toolbar';
import ItemEmptyTile from '../../../item-empty-tile/item-empty-tile';
import EmailModal from '../../../emailModal/emailModal';
import DownloadModal from '../../../downloadModal/downloadModal';
import FutureDeedReportRow from './FutureDeedReportRow';
import * as handlers from '../../../../../utils/handlers';

const FutureDeedReport = ({ tableData, fromDate, toDate, totalResults }) => {
  const [futureDeedTableData, setFutureDeedTableData] = useState([]);
  const { page, limit, setPage, setLimit } = usePagination();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [slStartNumber, setSlStartNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const tableColumns = [
    'SL. NO.',
    'purchaser Name',
    'BUSINESS UNITS',
    'Due Amount',
    'Due date',
    'counsellor name',
    'manager name'
  ];

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
      const { data } = await getReportData('futureDeedReport', requestParams);
      if (type === 'search') {
        setPage(1);
        setLimit(5);
        const response = await getTotalCount('futureDeedReport', {
          startDate: fromDate,
          endDate: toDate,
          opiOrName: value
        });
        setTotalCount(response?.data?.data?.totalResult);
      }
      if (data?.data) {
        setFutureDeedTableData(data.data);
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
      setFutureDeedTableData(tableData);
      setTotalCount(totalResults);
      setPage(1);
      setLimit(5);
      setSearchText('');
    }
  }, [tableData]);

  return (
    <div className="future-paid">
      <Toolbar
        title="Future Paid in Full Report"
        optionOneLabel="Email Report"
        optionOneIcon="MdOutlineEmail"
        onOptionOneClick={toggleEmailModal}
        optionTwoLabel="Download Report"
        optionTwoIcon="FiDownload"
        onOptionTwoClick={toggleDownloadModal}
        searchText={searchText}
        onSerchInputChange={onSerchInputChange}
        isSearchable
        SearchInputPlaceholder="OPI, Contract Number, Counsellor / Manager"
      />
      {futureDeedTableData?.length > 0 ? (
        <>
          <div className="table-resp-scroll">
            <Table
              headers={tableColumns}
              bordered
              responsive
              className="dashboard-table"
            >
              <tbody>
                {futureDeedTableData?.map((rowData, rowNumber) => (
                  <FutureDeedReportRow
                    rowData={rowData}
                    id={slStartNumber + rowNumber + 1}
                    nestedColumnsNumber={tableColumns?.length - 2}
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
        reportType="futureDeedReport"
        apiValues={{ startDate: fromDate, endDate: toDate }}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        toggle={toggleDownloadModal}
        reportType="futureDeedReport"
        urlParams={{ startDate: fromDate, endDate: toDate, page, limit: 200 }}
      />
    </div>
  );
};

export default FutureDeedReport;
