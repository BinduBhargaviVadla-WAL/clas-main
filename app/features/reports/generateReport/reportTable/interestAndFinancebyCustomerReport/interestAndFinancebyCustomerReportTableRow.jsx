/* eslint-disable react/prop-types */
import React from 'react';
import { getPrice } from '../../../../../common/routines/utils';
import * as formatters from '../../../../../utils/formatters';

const InterestAndFinancebyCustomerReportTableRow = ({ rowData, id }) => {
  const { purchaserName, purchaserNumber, service } = rowData;
  return (
    <>
      {service?.map(item => (
        <>
          <tr>
            <td rowSpan={service?.length * 2}>{id}</td>
            <td rowSpan={service?.length * 2} className="purchase-td">
              <span>{purchaserName}</span>
              <span>{purchaserNumber}</span>
            </td>
            <td className="business-td">
              <span>{item?.serviceType}</span>
              <span> {item?.serviceNumber}</span>
              Principle
            </td>
            <td>{getPrice(item?.OpeningBalance?.principle)}</td>
            {Object.values(item?.timePeriods).map(subItem => (
              <td>{subItem?.principle}</td>
            ))}
            <td>{getPrice(item?.BalancePeriod?.principle)}</td>
            <td>{getPrice(item?.ClosingBalance?.principle)}</td>
            <td>
              {item?.ClosingDate
                ? formatters.formatDate(item?.ClosingDate)
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Interest</td>
            <td>{getPrice(item?.OpeningBalance?.interest)}</td>
            {Object.values(item?.timePeriods).map(subItem => (
              <td>{getPrice(subItem?.interest)}</td>
            ))}
            <td>{getPrice(item?.BalancePeriod?.interest)}</td>
            <td>{getPrice(item?.ClosingBalance?.interest)}</td>
            <td>
              {item?.ClosingDate
                ? formatters.formatDate(item?.ClosingDate)
                : '-'}
            </td>
          </tr>
        </>
      ))}
    </>
  );
};

export default InterestAndFinancebyCustomerReportTableRow;
