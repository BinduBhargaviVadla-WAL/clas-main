const urlPrefix = '/clas';
export const reportUrls = {
  arAgingReport: {
    url: `${urlPrefix}/aging-report/services`,
    emailUrl: `${urlPrefix}/aging-report/services/export-email`,
    downloadUrl: `${urlPrefix}/aging-report/services/exports`
  },
  arAgingDetailedReport: {
    url: `${urlPrefix}/aging-report/details`,
    emailUrl: `${urlPrefix}/aging-report/details/export-email`,
    downloadUrl: `${urlPrefix}/aging-report/details/exports`,
    totalCountUrl: `${urlPrefix}/aging-report/details/count`
  },
  futureDeedReport: {
    url: `${urlPrefix}/future-deed-report/list`,
    emailUrl: `${urlPrefix}/future-deed-report/exports-email`,
    downloadUrl: `${urlPrefix}/future-deed-report/exports`,
    totalCountUrl: `${urlPrefix}/future-deed-report/count`
  },
  payOffReport: {
    url: `${urlPrefix}/pay-off`,
    emailUrl: `${urlPrefix}/pay-off/export-email`,
    downloadUrl: `${urlPrefix}/pay-off/exports`
    // totalCountUrl: `${urlPrefix}/pay-off/count`
  },
  interestAndFinancebyCustomer: {
    url: `${urlPrefix}/interest-finance-report/list`,
    emailUrl: `${urlPrefix}/interest-finance-report/export-email`,
    downloadUrl: `${urlPrefix}/interest-finance-report/exports`,
    totalCountUrl: `${urlPrefix}/interest-finance-report/count`
  }
};

export const accountingAutomatedReports = {
  cashInFlow: {
    url: '/clas/cash-flow'
  },
  revenue: {
    url: '/clas/total-revenue'
  },
  balanceDue: {
    url: '/clas/account-receivables'
  }
};
