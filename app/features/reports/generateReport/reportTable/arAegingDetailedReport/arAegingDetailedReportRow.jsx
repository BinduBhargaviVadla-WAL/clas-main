import React from 'react';
import * as formatters from '../../../../../utils/formatters';
import { getPrice } from '../../../../../common/routines/utils';

const ARAgingDetailedReportRow = ({
  rowData,
  id,
  nestedColumnsNumber,
  slNo
}) => {
  const { firstName, lastName, onePortalId, service } = rowData;

  return (
    <tr key={id} className="table-body-tr">
      <td width="50px" align="center" className="valign-middle">
        {slNo}
      </td>
      <td className="valign-middle">
        <div className="mb-1 display-block">{firstName + ' ' + lastName}</div>
        <div className="unit-no">{onePortalId}</div>
      </td>
      {[...Array(nestedColumnsNumber)].map((col, column) => {
        return (
          <td className="p-0 tb-next">
            {JSON.parse(service)?.map(serviceType => {
              return (
                <>
                  <table className="inner-table">
                    <tbody>
                      {serviceType.serviceDetails.map(
                        (rowDataValues, subIndex) => {
                          return (
                            <>
                              {column === 0 && (
                                <tr>
                                  <td>
                                    {subIndex === 0 && (
                                      <div className="mb-1 display-block detail-div">
                                        {`${serviceType?.serviceType} (${serviceType?.toatlNoService})`}
                                      </div>
                                    )}
                                    <span className="unit-no">
                                      {rowDataValues?.serviceNumber}
                                    </span>
                                  </td>
                                </tr>
                              )}
                              {column === 1 && (
                                <tr className="tr-next">
                                  <td>
                                    {rowDataValues?.contractDate
                                      ? formatters.formatDate(
                                          rowDataValues?.contractDate
                                        )
                                      : '-'}
                                  </td>
                                </tr>
                              )}
                              {column === 2 && (
                                <tr className="tr-next">
                                  <td>{rowDataValues?.pastDueDays || '-'}</td>
                                </tr>
                              )}
                              {column === 3 && (
                                <tr className="tr-next">
                                  <td>
                                    {getPrice(rowDataValues?.totalAmount) ||
                                      '-'}
                                  </td>
                                </tr>
                              )}
                              {column === 4 && (
                                <tr className="tr-next">
                                  <td>
                                    {getPrice(rowDataValues?.unDue) || '-'}
                                  </td>
                                </tr>
                              )}
                              {column === 5 && (
                                <tr className="tr-next">
                                  <td>
                                    {getPrice(rowDataValues?.overDue) || '-'}
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </>
              );
            })}
          </td>
        );
      })}
    </tr>
  );
};
export default ARAgingDetailedReportRow;
