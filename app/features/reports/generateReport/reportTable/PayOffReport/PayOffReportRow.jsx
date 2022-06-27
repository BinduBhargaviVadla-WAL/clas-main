/* eslint-disable react/prop-types */
import React from 'react';
import { getPrice } from '../../../../../common/routines/utils';
import * as formatters from '../../../../../utils/formatters';

const payOffReportRow = ({ rowData, id, nestedColumnsNumber }) => {
  return (
    <tr key={id} className="table-body-tr">
      <td width="50px" align="center" className="valign-middle">
        {id}
      </td>
      <td className="valign-middle">
        <div className="mb-1 display-block">{rowData.purchaserName}</div>
        <div className="unit-no">{rowData.purchaserNumber}</div>
      </td>
      <td className="valign-middle">
        <div className="mb-1 display-block">
          {rowData?.dueDate ? formatters.formatDate(rowData?.dueDate) : '-'}
        </div>
      </td>
      <td className="valign-middle">
        <div className="mb-1 display-block">
          {rowData?.paymentDate
            ? formatters.formatDate(rowData?.paymentDate)
            : '-'}
        </div>
      </td>
      {[...Array(nestedColumnsNumber)].map((col, column) => {
        return (
          <td className="p-0 tb-next">
            {rowData.service.map(serviceType => {
              return (
                <>
                  <table className="inner-table">
                    <tbody>
                      {Object.keys(
                        serviceType.timePeriod[
                          Object.keys(serviceType.timePeriod)[0]
                        ]
                      ).map((rowDataValues, subIndex) => {
                        return (
                          <>
                            {column === 0 && (
                              <tr>
                                <td>
                                  {subIndex === 0 && (
                                    <div className="mb-1 display-block detail-div">
                                      {serviceType?.serviceType}
                                    </div>
                                  )}
                                  <span className="unit-no">
                                    {rowDataValues}
                                  </span>
                                </td>
                              </tr>
                            )}
                            {column === 1 && (
                              <tr className="tr-next">
                                {Object.keys(serviceType.timePeriod).map(
                                  microItem => (
                                    <td>
                                      {getPrice(
                                        serviceType.timePeriod[microItem][
                                          rowDataValues
                                        ]
                                      )}
                                    </td>
                                  )
                                )}
                              </tr>
                            )}
                          </>
                        );
                      })}
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
export default payOffReportRow;
