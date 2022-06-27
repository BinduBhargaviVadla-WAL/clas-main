import axios from '.';
import { reportUrls, accountingAutomatedReports } from '../utils/urlResolver';

export const getReportData = (reportType, params) => {
  return axios({
    method: 'get',
    url: reportUrls[reportType]?.url,
    params
  });
};
export const getTotalCount = (reportType, params) => {
  return axios({
    method: 'get',
    url: reportUrls[reportType]?.totalCountUrl,
    params
  });
};
export const getAutomatedReportsData = (reportType, params) => {
  return axios({
    method: 'get',
    url: accountingAutomatedReports[reportType]?.url,
    params
  });
};

export const DownloadReportData = (reportType, params) => {
  return axios({
    method: 'get',
    url: reportUrls[reportType]?.downloadUrl,
    responseType: 'blob',
    params
  });
};

export const EmailReportData = (reportType, data) => {
  return axios({
    method: 'post',
    url: reportUrls[reportType]?.emailUrl,
    data
  });
};
