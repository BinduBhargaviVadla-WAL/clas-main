/* eslint-disable react/prop-types */
import React from 'react';
import * as formatters from '../../../../../utils/formatters';
import { getPrice } from '../../../../../common/routines/utils';

const FutureDeedReportRow = ({ rowData, id, nestedColumnsNumber }) => {
  return (
    <tr key={id} className="table-body-tr">
      <td width="50px" align="center" className="valign-middle">
        {id}
      </td>
      <td className="valign-middle">
        <div className="mb-1 display-block">{rowData.purchaserName}</div>
        <div className="unit-no">{rowData.onePortalId}</div>
      </td>
      {[...Array(nestedColumnsNumber)].map((col, column) => {
        return (
          <td className="p-0 tb-next">
            {rowData.businessUnit.map(item => {
              return (
                <>
                  <table className="inner-table">
                    <tbody>
                      {item.unitDetails.map((subItem, subIndex) => {
                        return (
                          <>
                            {column === 0 && (
                              <tr>
                                <td>
                                  {subIndex === 0 && (
                                    <div className="mb-1 display-block detail-div">
                                      {`${item?.businessUnitType}(${item.unitDetails.length})`}
                                    </div>
                                  )}
                                  <span className="unit-no">
                                    {subItem.contractNumber}
                                  </span>
                                </td>
                              </tr>
                            )}
                            {column === 2 && (
                              <tr className="tr-next">
                                <td>
                                  {subItem?.dueDate
                                    ? formatters.formatDate(subItem?.dueDate)
                                    : '-'}
                                </td>
                              </tr>
                            )}
                            {column === 3 && (
                              <tr className="tr-next">
                                <td>{subItem.counselorName || '-'}</td>
                              </tr>
                            )}
                            {column === 1 && (
                              <tr className="tr-next">
                                <td>{getPrice(subItem?.dueAmount) || '-'}</td>
                              </tr>
                            )}
                            {column === 4 && (
                              <tr className="tr-next">
                                <td>{subItem.managerName || '-'}</td>
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

export default FutureDeedReportRow;
