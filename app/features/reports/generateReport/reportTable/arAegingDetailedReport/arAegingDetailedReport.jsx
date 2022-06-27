import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';
import { Table, Pagination, Loader } from '../../../../../common/components';
import ARAgingDetailedReportRow from './arAegingDetailedReportRow';
import { getReportData, getTotalCount } from '../../../../../api/reports';
import { usePagination } from '../../../../../common/hooks/data';
import Toolbar from '../../../toolbar/toolbar';
import ItemEmptyTile from '../../../item-empty-tile/item-empty-tile';
import EmailModal from '../../../emailModal/emailModal';
import DownloadModal from '../../../downloadModal/downloadModal';
import * as handlers from '../../../../../utils/handlers';

const ARAgingDetailedReport = ({ tableData, date, totalResults }) => {
  const [arAgeingTableData, setArAgeingTableData] = useState([]);
  const { page, limit, setPage, setLimit } = usePagination();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);
  const [slStartNumber, setSlStartNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const tableColumns = [
    'SL.NO',
    'PURCHASER NAME',
    'BUSINESS UNITS',
    'CONTRACT DATE',
    'PAST DUE DAYS',
    'TOTAL AMOUNT',
    'UN-DUE',
    'OVER DUE'
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
      reportDate: date,
      page,
      limit,
      ...((type === 'search' || searchText.length > 0) && {
        opiOrName: type === 'search' ? value : searchText
      })
    };
    try {
      const { data } = await getReportData(
        'arAgingDetailedReport',
        requestParams
      );
      if (type === 'search') {
        setPage(1);
        setLimit(5);
        const response = await getTotalCount('arAgingDetailedReport', {
          reportDate: date,
          opiOrName: value
        });
        setTotalCount(response?.data?.data?.totalCount);
      }

      if (data?.data?.items) {
        setArAgeingTableData(data.data.items);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlers.apiErrorHandler(err);
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
      setArAgeingTableData(tableData);
      setTotalCount(totalResults);
      setPage(1);
      setLimit(5);
      setSearchText('');
    }
  }, [tableData]);

  return (
    <>
      <Toolbar
        title="Detailed AR Aging Report"
        subTitle={`As on Date: ${moment().format('MMM DD,YYYY')}`}
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
      {arAgeingTableData && arAgeingTableData?.length > 0 ? (
        <>
          <div className="table-resp-scroll">
            <Table
              headers={tableColumns}
              bordered
              responsive
              className="dashboard-table"
            >
              <tbody>
                {arAgeingTableData?.map((rowData, rowNumber) => (
                  <ARAgingDetailedReportRow
                    slNo={slStartNumber + rowNumber + 1}
                    rowData={rowData}
                    id={rowNumber}
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
        reportType="arAgingDetailedReport"
        apiValues={{ reportDate: date }}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        toggle={toggleDownloadModal}
        reportType="arAgingDetailedReport"
        urlParams={{ reportDate: date, page, limit: 200 }}
      />
    </>
  );
};

export default ARAgingDetailedReport;
