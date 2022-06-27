import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment-timezone';
import { Row, Col, Card } from 'reactstrap';
import { getAutomatedReportsData } from '../../../api/reports';
import * as formatters from '../../../utils/formatters';
import { Select, InfoLabel } from '../../../common/components';
import {
  Entities,
  durationsAutomatedAccounting
} from '../../../constants/reports';
import { useSetLoading } from '../../../common/hooks/appearance';
import * as handlers from '../../../utils/handlers';

const initialFilters = {
  entity: Entities[0],
  cashInFlow: durationsAutomatedAccounting[0],
  revenue: durationsAutomatedAccounting[0],
  balanceDue: durationsAutomatedAccounting[0]
};

const AccountingAutomatedReports = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [
    accountingAutomatedReportData,
    setAccountingAutomatedReportData
  ] = useState({
    cashInFlow: {
      totalCashAmount: null,
      lastUpdatedDate: null
    },
    revenue: { totalAmount: null, lastUpdatedDate: null },
    balanceDue: {
      dueAmount: null,
      lastUpdatedDate: null
    }
  });

  useEffect(() => {
    assignStartandEndate('cashInFlow', filters?.cashInFlow?.value);
    assignStartandEndate('revenue', filters?.revenue?.value);
    assignStartandEndate('balanceDue', filters?.balanceDue?.value);
  }, []);

  const assignStartandEndate = async (reportType, value) => {
    setLoading(true);
    try {
      const { startDate, endDate } = handlers.getStartDateEndDate(value);
      const response = await getAutomatedReportsData(reportType, {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        timezone: moment.tz.guess()
      });
      setAccountingAutomatedReportData(prevState => {
        return {
          ...prevState,
          [reportType]: response.data.data[0]
        };
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlers.apiErrorHandler(err);
    }
  };

  const handleFilters = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  const showLoading = useMemo(() => loading, [loading]);
  useSetLoading(showLoading);
  return (
    <div className="account-reports">
      <Row className="entity">
        <Select
          name="Entity"
          formInput={false}
          classNamePrefix="select-dropdown"
          placeholder="Entity"
          label="ENTITY"
          kind="minimal"
          onChange={val => {
            handleFilters('entity', val);
          }}
          value={filters?.entity}
          options={Entities}
          size="lg"
        />
      </Row>
      <hr />
      <h3 className="account-heading">Accounting Automated Reports</h3>
      <Row>
        <Col lg={4} md={4}>
          <div className="account-label-info">
            <InfoLabel label="Cash In-flow" />
            <Select
              name="cashInFlow"
              formInput={false}
              classNamePrefix="select-dropdown"
              placeholder="Cash In-flow"
              onChange={val => {
                handleFilters('cashInFlow', val);
                assignStartandEndate('cashInFlow', val.value);
              }}
              value={filters.cashInFlow}
              options={durationsAutomatedAccounting}
              size="sm"
            />
          </div>

          <Card className="account-card">
            <InfoLabel label="Total Cashflow" />
            <p className="account-p">
              Last updated:
              {formatters.formatDate(
                accountingAutomatedReportData?.cashInFlow?.lastUpdatedDate
              ) || '-'}
            </p>
            <h3 className="account-h">
              {formatters.getPrice(
                accountingAutomatedReportData?.cashInFlow?.totalCashAmount
              )}
            </h3>
          </Card>
        </Col>
        <Col lg={4} md={4}>
          <div className="account-label-info">
            <InfoLabel label="Revenue" />
            <Select
              name="Revenue"
              formInput={false}
              classNamePrefix="select-dropdown"
              placeholder="Revenue"
              onChange={val => {
                handleFilters('revenue', val);
                assignStartandEndate('revenue', val.value);
              }}
              value={filters?.revenue}
              options={durationsAutomatedAccounting}
              size="sm"
            />
          </div>

          <Card className="account-card">
            <InfoLabel label="Total Amount" />
            <p className="account-p">
              Last updated:
              {formatters.formatDate(
                accountingAutomatedReportData?.revenue?.lastUpdatedDate
              ) || '-'}
            </p>
            <h3 className="account-h">
              {formatters.getPrice(
                accountingAutomatedReportData?.revenue?.totalAmount
              )}
            </h3>
          </Card>
        </Col>
        <Col lg={4} md={4}>
          <div className="account-label-info">
            <InfoLabel label=" Pending / Balance Due" />
            <Select
              name="balance due"
              formInput={false}
              classNamePrefix="select-dropdown"
              placeholder="pending/balance due"
              onChange={val => {
                handleFilters('balanceDue', val);
                assignStartandEndate('balanceDue', val.value);
              }}
              value={filters.balanceDue}
              options={durationsAutomatedAccounting}
              size="sm"
            />
          </div>
          <Card className="account-card">
            <InfoLabel label="Account Receivables" />
            <p className="account-p">
              Last updated:
              {formatters.formatDate(
                accountingAutomatedReportData?.balanceDue?.lastUpdatedDate
              ) || '-'}
            </p>
            <h3 className="account-h">
              {formatters.getPrice(
                accountingAutomatedReportData?.balanceDue.dueAmount
              )}
            </h3>
          </Card>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default AccountingAutomatedReports;
