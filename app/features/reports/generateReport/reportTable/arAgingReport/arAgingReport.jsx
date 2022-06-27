import React, { useState } from 'react';
import moment from 'moment';
import { Table } from '../../../../../common/components';
import ARAgingReportRow from './arAgingReportRow';
import Toolbar from '../../../toolbar/toolbar';
import ItemEmptyTile from '../../../item-empty-tile/item-empty-tile';
import DownloadModal from '../../../downloadModal/downloadModal';
import EmailModal from '../../../emailModal/emailModal';

const ARAgingReport = ({ tableData, date }) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const toggleEmailModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen(!isDownloadModalOpen);
  };

  const tableColumns = [
    'BUSINESS UNITS',
    'TOTAL AMOUNT',
    'CURRENT DUE',
    'PAST DUE',
    '0-30',
    '31-60',
    '61-90',
    '91-120',
    '>120'
  ];

  return (
    <>
      {tableData && tableData?.length > 0 ? (
        <>
          <Toolbar
            title="AR Aging - (AR Level)"
            subTitle={`As on Date: ${moment().format('MMM DD,YYYY')}`}
            optionOneLabel="Email Report"
            optionOneIcon="MdOutlineEmail"
            onOptionOneClick={toggleEmailModal}
            optionTwoLabel="Download Report"
            optionTwoIcon="FiDownload"
            onOptionTwoClick={toggleDownloadModal}
          />
          <Table
            headers={tableColumns}
            bordered
            responsive
            className="dashboard-table"
          >
            <tbody>
              {tableData?.map((rowData, rowNumber) => (
                <ARAgingReportRow rowData={rowData} id={rowNumber} />
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <ItemEmptyTile />
      )}

      <EmailModal
        isOpen={isEmailModalOpen}
        toggle={toggleEmailModal}
        reportType="arAgingReport"
        apiValues={{ reportDate: date }}
      />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        toggle={toggleDownloadModal}
        reportType="arAgingReport"
        urlParams={{ reportDate: date }}
      />
    </>
  );
};

export default ARAgingReport;
