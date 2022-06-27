/* eslint-disable react/prop-types */
/* eslint-disable promise/always-return */
/* eslint-disable react/no-children-prop */
import React, { useState, useMemo } from 'react';
import {
  InfoLabel,
  ModalComponent,
  Button,
  RadioInput
} from '../../../common/components';
import { DownloadReportData } from '../../../api/reports';
import { getFileNameFromUrl } from '../../../utils/utils';
import * as handlers from '../../../utils/handlers';
import { useSetLoading } from '../../../common/hooks/appearance';

const DownloadModal = ({ isOpen, toggle, reportType, urlParams }) => {
  const downloadTypes = ['PDF', 'Excel', 'CSV'];
  const [exportType, setExportType] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileTypeExport = () => {
    switch (exportType) {
      case 'PDF':
        return 'application/pdf';
      case 'CSV':
        return 'text/csv';
      case 'Excel':
        return 'application/vnd.sealed.xls';
      default:
    }
  };

  const downloadHandler = async () => {
    setLoading(true);
    const params = {
      ...urlParams,
      exportType: exportType.toLowerCase()
    };

    try {
      const response = await DownloadReportData(reportType, params);
      if (response?.status === 200) {
        const blobUrl = window.URL.createObjectURL(new Blob([response?.data]), {
          type: fileTypeExport()
        });
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute(
          'download',
          `${getFileNameFromUrl(blobUrl)}.${fileTypeExport().slice(-3)}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handlers.successHandler({
          message: {
            message: 'Successfully File Downloaded',
            title: 'Success'
          }
        });
        setExportType(null);
      } else {
        handlers.apiErrorHandler({ message: 'Network Error' });
      }
      setLoading(false);
      toggle();
    } catch (err) {
      setLoading(false);
      toggle();
      handlers.apiErrorHandler(err);
    }
  };

  const showLoading = useMemo(() => loading, [loading]);
  useSetLoading(showLoading);

  const ModalGenerator = () => {
    return (
      <div
        className="Download-modal"
        style={{
          padding: '40px'
        }}
      >
        <div className="Download-heading">
          <InfoLabel label="Download Report" />
        </div>
        <p className="Download-sub-heading">
          In which format would you like to download the report
        </p>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className="Add-email"
        >
          {downloadTypes.map(item => {
            return (
              <RadioInput
                formInput={false}
                name="discountType"
                label={`Download as ${item} Format`}
                value={item}
                onChange={() => {
                  setExportType(item);
                }}
              />
            );
          })}
        </div>
        <hr />
        <div className="Download-btn-section">
          <Button
            color="primary"
            size="lg"
            textTransform=""
            style={{ fontSize: '14px' }}
            className="send-btn"
            onClick={downloadHandler}
            disabled={!exportType}
          >
            Download
          </Button>
          <Button
            color="#F3F3F3"
            className="btn-close"
            textTransform=""
            style={{ fontSize: '14px' }}
            onClick={() => {
              setExportType(null);
              toggle();
            }}
          >
            Close
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      toggle={toggle}
      children={ModalGenerator()}
      className="DownloadModalWrapper"
    />
  );
};

export default DownloadModal;
