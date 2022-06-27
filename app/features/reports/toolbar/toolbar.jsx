/* eslint-disable react/prop-types */
import React from 'react';
import { InfoLabel, SearchInput } from '../../../common/components';

const Toolbar = ({
  title,
  subTitle,
  optionOneLabel,
  optionOneIcon,
  onOptionOneClick,
  optionTwoLabel,
  optionTwoIcon,
  onOptionTwoClick,
  isSearchable = false,
  searchText,
  onSerchInputChange,
  SearchInputPlaceholder
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        className="row toolbar-row"
      >
        <div className="aging-report-title col-4">
          <InfoLabel label={title} />
          {subTitle && (
            <div className="aging-report-subtitle">
              <InfoLabel label={subTitle} size="12px" weight="0" />
            </div>
          )}
        </div>
        {isSearchable && (
          <div className="d-flex search-toolbar col-5 p-0">
            <SearchInput
              placeholder={SearchInputPlaceholder}
              searchText={searchText}
              handleChange={onSerchInputChange}
            />
            <div className="hr-r" />
          </div>
        )}
        <div className="aging-report-toolbar col-3 p-0">
          {optionOneLabel && (
            <InfoLabel
              showIcon
              label={optionOneLabel}
              iconLocation="Left"
              iconType={optionOneIcon}
              onClick={onOptionOneClick}
            />
          )}
          <div className="hr-r" />
          {optionTwoLabel && (
            <InfoLabel
              showIcon
              label={optionTwoLabel}
              iconLocation="Left"
              iconType={optionTwoIcon}
              onClick={onOptionTwoClick}
            />
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Toolbar;
