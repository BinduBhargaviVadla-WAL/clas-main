/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import { Select, Button, DatePicker } from '../../../../common/components';
import {
  reportTypes,
  pastDuration,
  futureDuration
} from '../../../../constants/reports';
import { getReportData, getTotalCount } from '../../../../api/reports';
import { useSetLoading } from '../../../../common/hooks/appearance';
import { components } from '../../../../utils/components';
import * as handlers from '../../../../utils/handlers';

const initialFilters = {
  reportType: null,
  page: 1,
  limit: 5,
  filterType: null,
  duration: null
};

const FilterItems = ({ setShowTable }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [fromDateRange, setFromDateRange] = useState(null);
  const [toDateRange, setToDateRange] = useState(null);
  const [dateRangeDisabled, setDateRangeDisabled] = useState(false);
  const handleFilters = (filterType, value) => {
    if (filterType === 'reportType') {
      setFilters({
        ...filters,
        [filterType]: value,
        filterType: components[value.value]?.type,
        duration: null
      });
      setFromDateRange(null);
      setToDateRange(null);
      setDate(null);
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const dateOptionsGenerator = type => {
    const options = {
      minDate: null,
      maxDate: null,
      dateFormat: 'd M Y'
    };
    switch (filters?.reportType?.value) {
      case 'futureDeedReport': {
        const min = new Date();
        min.setHours(0, 0, 0, 0);
        if (type === 'fromDate') {
          min.setDate(min.getDate() + 1);
        } else {
          min.setDate(fromDateRange?.getDate() + 1);
        }
        options.minDate = min;
        return options;
      }
      case 'payOffReport': {
        const min = new Date();
        min.setHours(0, 0, 0, 0);
        if (type === 'fromDate') {
          min.setDate(min.getDate() + 1);
        } else {
          min.setDate(fromDateRange?.getDate() + 1);
        }
        options.minDate = min;
        return options;
      }
      case 'interestAndFinancebyCustomer': {
        options.maxDate = new Date();
        if (type === 'toDate') {
          options.minDate = fromDateRange;
        }
        return options;
      }
      default: {
        options.maxDate = new Date();
        return options;
      }
    }
  };

  const getPaginationParams = (reportType, fromDate, toDate, reportDate) => {
    let params = {};
    switch (reportType) {
      case 'futureDeedReport':
        params = {
          startDate: fromDate,
          endDate: toDate
        };
        break;
      case 'payOffReport':
        params = {
          startDate: fromDate,
          endDate: toDate
        };
        break;
      case 'interestAndFinancebyCustomer':
        params = {
          fromDate,
          toDate
        };
        break;
      default:
        params = {
          reportDate
        };
    }

    return params;
  };
  const generateTable = async () => {
    // formatting date asper the backend
    const toDate = moment(toDateRange).format('YYYY-MM-DD');
    const fromDate = moment(fromDateRange).format('YYYY-MM-DD');
    const reportDate = moment(date).format('YYYY-MM-DD');
    const paginationParamsforList = {
      page: filters?.page,
      limit: filters?.limit
    };
    const requestParams = {
      ...(components[filters?.reportType?.value]?.pagination && {
        ...paginationParamsforList
      }),
      ...getPaginationParams(
        filters?.reportType?.value,
        fromDate,
        toDate,
        reportDate
      )
    };
    setLoading(true);
    try {
      const { data } = await getReportData(
        filters?.reportType?.value,
        requestParams
      );
      let totalCount;
      // remove payoff report condition when count api is ready
      if (
        components[filters?.reportType?.value]?.pagination &&
        filters?.reportType?.value !== 'payOffReport'
      ) {
        const response = await getTotalCount(
          filters?.reportType?.value,
          getPaginationParams(
            filters?.reportType?.value,
            fromDate,
            toDate,
            reportDate
          )
        );
        totalCount =
          filters?.reportType?.value === 'futureDeedReport' ||
          filters?.reportType?.value === 'interestAndFinancebyCustomer'
            ? response?.data?.data?.totalResult
            : response?.data?.data?.totalCount;
      }
      setShowTable({
        show: true,
        tableName: filters?.reportType?.value,
        tableData:
          filters?.reportType?.value === 'futureDeedReport' ||
          filters?.reportType?.value === 'payOffReport' ||
          filters?.reportType?.value === 'interestAndFinancebyCustomer'
            ? data?.data
            : data?.data?.items,
        date: reportDate,
        fromDate,
        toDate,
        totalResults: totalCount
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handlers.apiErrorHandler(error);
    }
  };

  const validateForm = () => {
    if (filters?.filterType === 1) {
      return !date;
    }
    return !(fromDateRange && toDateRange);
  };

  const setDateRange = selectedDuration => {
    if (selectedDuration === 'custom') {
      setDateRangeDisabled(false);
    } else {
      const { startDate, endDate } = handlers.getStartDateEndDate(
        selectedDuration
      );
      setFromDateRange(startDate);
      setToDateRange(endDate);
      setDateRangeDisabled(true);
    }
  };

  const showLoading = useMemo(() => loading, [loading]);
  useSetLoading(showLoading);
  return (
    <>
      <Row className="generate-card">
        <Col lg={6} className="generate-card-item">
          <Row>
            <Col
              lg={filters?.filterType === 1 ? 9 : 8}
              className="generate-label"
            >
              <Select
                required
                name="reports"
                formInput={false}
                classNamePrefix="select-dropdown"
                placeholder="Select Report"
                label="Generate report"
                onChange={val => {
                  handleFilters('reportType', val);
                }}
                value={filters.reportType}
                options={reportTypes}
                size="lg"
              />
            </Col>

            {filters?.filterType === 2 && (
              <Col lg={4} className="Duration-label">
                <Select
                  required
                  name="duration"
                  formInput={false}
                  classNamePrefix="select-dropdown"
                  placeholder="Duration"
                  label="Duration Days"
                  onChange={val => {
                    handleFilters('duration', val);
                    setDateRange(val.value);
                  }}
                  value={filters.duration}
                  options={
                    filters?.reportType?.value === 'futureDeedReport' ||
                    filters?.reportType?.value === 'payOffReport'
                      ? futureDuration
                      : pastDuration
                  }
                  size="lg"
                />
              </Col>
            )}
          </Row>
        </Col>
        <Col lg={6}>
          <Row className="generate-card-item1">
            {filters?.filterType === 1 && (
              <Col lg={4} className="date-picker-g">
                <DatePicker
                  required
                  name="enter date"
                  classNamePrefix="datepicker-wrapper"
                  formInput={false}
                  placeholder="Date"
                  label="Enter Date"
                  value={date}
                  onChange={([selectedDate]) => {
                    setDate(selectedDate);
                  }}
                  options={dateOptionsGenerator('date')}
                  kind="md"
                />
              </Col>
            )}
            {filters?.filterType === 2 && (
              <>
                <Col lg={4} className="date-picker-g">
                  <DatePicker
                    required={filters?.duration?.value === 'custom'}
                    formInput={false}
                    placeholder="Date"
                    value={fromDateRange}
                    onChange={([selectedDate]) => {
                      setFromDateRange(selectedDate);
                    }}
                    options={dateOptionsGenerator('fromDate')}
                    label="From"
                    kind="md"
                    disabled={
                      !filters?.duration?.value ? true : dateRangeDisabled
                    }
                  />
                </Col>
                <Col lg={4} className="date-picker-g">
                  <DatePicker
                    required={filters?.duration?.value === 'custom'}
                    formInput={false}
                    placeholder="Date"
                    value={toDateRange}
                    onChange={([selectedDate]) => {
                      setToDateRange(selectedDate);
                    }}
                    options={dateOptionsGenerator('toDate')}
                    label="To"
                    kind="md"
                    disabled={
                      !filters?.duration?.value || !fromDateRange
                        ? true
                        : dateRangeDisabled
                    }
                  />
                </Col>
              </>
            )}

            <Col
              lg={filters?.filterType === 1 ? 8 : 4}
              className={
                filters?.filterType === 1
                  ? 'generate-button'
                  : 'generate-button-1'
              }
            >
              <Button
                onClick={generateTable}
                disabled={validateForm()}
                color="primary"
              >
                Generate
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default FilterItems;
