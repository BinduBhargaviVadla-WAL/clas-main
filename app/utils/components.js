import ARAgingReportTable from '../features/reports/generateReport/reportTable/arAgingReport/arAgingReport';
import ARAgingDetailedReportTable from '../features/reports/generateReport/reportTable/arAegingDetailedReport/arAegingDetailedReport';
import FutureDeedReport from '../features/reports/generateReport/reportTable/FutureDeedReport/FutureDeedReport';
import PayOffReport from '../features/reports/generateReport/reportTable/PayOffReport/PayOffReport';
import InterestAndFinancebyCustomerReportTable from '../features/reports/generateReport/reportTable/interestAndFinancebyCustomerReport/interestAndFinancebyCustomerReportTable';

export const components = {
  arAgingReport: {
    component: ARAgingReportTable,
    type: 1,
    pagination: false,
    range: false
  },
  arAgingDetailedReport: {
    component: ARAgingDetailedReportTable,
    type: 1,
    pagination: true,
    range: false
  },
  futureDeedReport: {
    component: FutureDeedReport,
    type: 2,
    pagination: true,
    range: true
  },
  payOffReport: {
    component: PayOffReport,
    type: 2,
    pagination: true,
    range: true
  },
  interestAndFinancebyCustomer: {
    component: InterestAndFinancebyCustomerReportTable,
    type: 2,
    pagination: true,
    range: true
  }
};
