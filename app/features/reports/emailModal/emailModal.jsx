/* eslint-disable promise/always-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React, { useState, useMemo } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import validator from 'validator';
import {
  InfoLabel,
  Tags,
  ModalComponent,
  Input,
  Button,
  RadioInput
} from '../../../common/components';
import { EmailReportData } from '../../../api/reports';
import * as handlers from '../../../utils/handlers';
import { useSetLoading } from '../../../common/hooks/appearance';

const EmailModal = ({ isOpen, toggle, reportType, apiValues }) => {
  const [newEmail, setNewEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [emails, setEmails] = useState([]);
  const downloadTypes = ['pdf', 'excel', 'csv'];
  const [exportType, setExportType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailSending = async () => {
    setLoading(true);
    const payload = {
      ...apiValues,
      exportType,
      emailIds: emails
    };
    try {
      const response = await EmailReportData(reportType, payload);
      if (response.status === 200) {
        handlers.successHandler({
          message: {
            message: 'Successfully report sent',
            title: 'Success'
          }
        });
      } else {
        handlers.apiErrorHandler({ message: 'Network Error' });
      }
      setEmails([]);
      setExportType(null);
      setLoading(false);
      setNewEmail('');
      setErrMsg('');
      toggle();
    } catch (err) {
      setEmails([]);
      setExportType(null);
      setLoading(false);
      setNewEmail('');
      setErrMsg('');
      toggle();
      handlers.apiErrorHandler(err);
    }
  };

  const handleEmailRemove = index => {
    const temp = [...emails];
    temp.splice(index, 1);
    setEmails(temp);
  };

  const showLoading = useMemo(() => loading, [loading]);
  useSetLoading(showLoading);

  const EmailModalGenerator = () => {
    return (
      <div
        className="Email-modal"
        style={{
          padding: '40px'
        }}
      >
        <div className="Email-heading">
          <InfoLabel label="E-mail Report" />
        </div>
        <p className="Email-sub-heading">
          Add an e-mail whom you would like to send this reports to.
        </p>
        {errMsg && <p className="error-message">{errMsg}</p>}
        <div style={{ display: 'flex' }} className="Add-email">
          <Input
            formInput={false}
            size="lg"
            type="email"
            placeholder="Enter the e-mail address"
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
          />
          <Button
            color="secondary"
            textTransform=""
            size="xs"
            style={{ fontSize: '14px' }}
            disabled={!newEmail}
            onClick={() => {
              if (
                newEmail &&
                validator.isEmail(newEmail) &&
                !emails.includes(newEmail)
              ) {
                setEmails([...emails, newEmail]);
                setNewEmail('');
                setErrMsg('');
              } else if (emails.includes(newEmail)) {
                setErrMsg('Email Address already Exists.');
              } else {
                setErrMsg('Please Enter Valid Email Address.');
              }
            }}
          >
            <HiPlusSm /> Add
          </Button>
        </div>
        <hr />

        <div className="Sending-list">
          {emails?.length > 0 && <p>Sending List</p>}
          <Tags
            tags={emails}
            onRemoveClick={handleEmailRemove}
            className="sending-list-item"
          />
        </div>
        {emails?.length > 0 && <hr />}
        {emails?.length > 0 && (
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            className="Add-email"
          >
            {downloadTypes.map(item => {
              return (
                <RadioInput
                  formInput={false}
                  name="exportType"
                  label={`Email as ${item.toUpperCase()} Format`}
                  value={item}
                  onChange={() => {
                    setExportType(item);
                  }}
                />
              );
            })}
          </div>
        )}
        {emails?.length > 0 && <hr />}
        <div className="email-btn-section">
          <div>
            <Button
              disabled={!exportType}
              color="primary"
              size="lg"
              textTransform=""
              style={{ fontSize: '14px' }}
              className="send-btn"
              onClick={handleEmailSending}
            >
              Send the Reports ({emails?.length} People)
            </Button>
          </div>
          <Button
            color="#F3F3F3"
            className="btn-close"
            textTransform=""
            style={{ fontSize: '14px' }}
            onClick={() => {
              setNewEmail('');
              setErrMsg('');
              setEmails([]);
              setExportType(null);
              toggle();
            }}
          >
            Close
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      toggle={toggle}
      children={EmailModalGenerator()}
      className="EmailModalWrapper"
    />
  );
};

export default EmailModal;
