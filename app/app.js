/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import Rollbar from 'rollbar';

import { createNamespacer } from './utils/reducers';
import { useSetLoading } from './common/hooks/appearance';
import { logout } from './common/routines/user-operations';
import { AboutModal } from './common/components';

const electron = window.require('electron');
const { ipcRenderer } = electron;
const { ipcRenderer: ipc } = require('electron-better-ipc');

const namespacer = createNamespacer('SUPPORT');

const Loader = connect(state => {
  return {
    isLoading: state.appearance.isLoading
  };
}, null)(props => {
  if (props.isLoading) {
    return (
      <div className="loader-section">
        <div className="loader">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  return null;
});

const App = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [showAboutWindow, setShowAboutWindow] = useState(false);
  const [appVersion, setAppVersion] = useState();
  const appDataLoading = useSelector(state => state.appearance.appDataLoading);
  const dispatch = useDispatch();

  const rollbarConfig = {
    accessToken: '0ceb8259c22b4ee986246541c10917f4',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production'
    },
    scrubFields: ['ssn', 'cardnumber', 'cvc', 'postal']
  };

  // const showLoading = useMemo(() => {
  //   return loading;
  // }, [loading]);

  const onAboutModalClose = useCallback(() => {
    setShowAboutWindow(false);
  }, []);

  useSetLoading(false);

  useEffect(() => {
    setLoading(true);
    console.log('start migrations');
    ipcRenderer.send('run-migrations');

    ipcRenderer.on('run-migrations-status', (event, value) => {
      ipcRenderer.send('read-sqlite-data');
      console.log(value);
    });

    ipcRenderer.on('read-sqlite-status', (event, value) => {
      dispatch({
        type: namespacer('SET_OFFLINE_DATA'),
        payload: { value }
      });
      console.log(value);
      setLoading(false);
      logout(); // TODO (harsh) CCS-5909 remove temp fix to logout on new installation
    });

    ipc.answerMain('show-about', version => {
      setAppVersion(version);
      setShowAboutWindow(true);
    });

    // Before the app component closes, we will call the logout
    // to log out the user and clear the global states.
    if (process.env.NODE_ENV !== 'development') {
      window.addEventListener('beforeunload', logout);
    }

    if (process.env.NODE_ENV === 'production') {
      const rollbar = new Rollbar(rollbarConfig);
      console.log(rollbar);
    }
  }, []);

  return (
    <>
      <Loader />
      {showAboutWindow && (
        <AboutModal onClose={onAboutModalClose} version={appVersion} />
      )}
      {/* {children} */}
      {appDataLoading ? (
        <section className="login">
          <h3>Loading...</h3>
        </section>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default App;
