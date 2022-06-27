import React from 'react';
import { getPrice } from '../../../../../common/routines/utils';

const ARAgingReportRow = ({ rowData, id }) => {
  const {
    serviceType,
    totalAmount,
    overDue,
    unDue,
    day30,
    day60,
    day90,
    day120,
    above120
  } = rowData;
  return (
    <tr key={id} className="table-body-tr">
      <td>{serviceType === 'cemetry' ? 'Cemetery' : serviceType}</td>
      <td>{getPrice(totalAmount) || '-'}</td>
      <td>{getPrice(overDue) || '-'}</td>
      <td>{getPrice(unDue) || '-'}</td>
      <td>{getPrice(day30) || '-'}</td>
      <td>{getPrice(day60) || '-'}</td>
      <td>{getPrice(day90) || '-'}</td>
      <td>{getPrice(day120) || '-'}</td>
      <td>{getPrice(above120) || '-'}</td>
    </tr>
  );
};

export default ARAgingReportRow;
