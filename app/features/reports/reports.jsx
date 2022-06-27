import React from 'react';
import { Layout } from '../../common/components';
import AccountingAutomatedReports from './accountingAutomatedReports/AccountingAutomatedReports';
import GenerateReport from './generateReport';

const Reports = () => {
  return (
    <Layout>
      <AccountingAutomatedReports />
      <GenerateReport />
    </Layout>
  );
};

export default Reports;
