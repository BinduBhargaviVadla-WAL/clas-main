/* eslint-disable promise/always-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import useAsync from 'react-use-async-hook';
import { Alert } from 'reactstrap';
import { useSelector } from 'react-redux';

import { Input } from '../../common/components';
import logo from '../../assets/images/cl-logo.png';
import { env } from '../../config/env';
import validationMessages from '../../constants/validation-messages';
import * as authApi from '../../api/auth';
import { login as loginRoutine } from '../../common/routines/user-operations';
import { setServerUrl, setServerPort } from '../../common/hooks/server';
import { emailRegex } from '../../constants/regex';

const Login = () => {
  const { login } = validationMessages;
  const serverUrl = useSelector(state => state.server.serverUrl);
  const serverPort = useSelector(state => state.server.serverPort);

  const [errorMessage, setErrorMessage] = useState();

  const { data: response, loading, error, execute: doLogin } = useAsync({
    autoExecute: false,
    task: authApi.login
  });

  const handleSubmit = values => {
    doLogin({
      username: values.username,
      password: values.password
    });
  };

  useEffect(() => {
    if (!error && response?.status === 200) {
      const { userDetails } = response.data;

      loginRoutine({
        userId: userDetails.ldapId,
        token: response.headers?.authtoken,
        email: userDetails.email,
        name: userDetails.name,
        location: userDetails.location,
        port: serverPort
      });
    }

    if (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  }, [error, response]);
  return (
    <section className="login">
      {error && (
        <Alert color="danger">
          {errorMessage || 'Oops! Something Went Wrong'}
        </Alert>
      )}
      <div className="content">
        <div className="heading">
          <img src={logo} alt="hmis-app" className="cypresslawn-logo" />
          <p className="subject">
            Please login with your email id to continue.
          </p>
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            serverUrl,
            serverPort
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .required(login.email.REQUIRED)
              .matches(emailRegex, login.email.EMAIL_INVALID),
            password: Yup.string().required(login.password.REQUIRED)
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleSubmit: onSubmit }) => {
            return (
              <Form onSubmit={onSubmit}>
                <div className={classNames('form-group', 'position-relative')}>
                  <label htmlFor="username">Email ID</label>
                  <Field
                    name="username"
                    type="text"
                    className={classNames('form-control', {
                      'has-error': errors.username && touched.username
                    })}
                    placeholder="john.dow@gmail.com"
                    disabled={loading}
                  />
                  <div className="error-msg">
                    <ErrorMessage name="username" />
                  </div>
                </div>

                <div className={classNames('form-group', 'position-relative')}>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={classNames('form-control', {
                      'has-error': errors.password && touched.password
                    })}
                    placeholder="************"
                    disabled={loading}
                  />
                  <div className="error-msg">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                {env !== 'production' && env !== 'preprod' && (
                  <>
                    <div
                      className={classNames('form-group', 'position-relative')}
                    >
                      <label htmlFor="serverUrl">Server Endpoint</label>
                      <Input
                        formInput
                        name="serverUrl"
                        disabled={loading}
                        required
                        value={values.serverUrl}
                        onBlur={() => setServerUrl(values.serverUrl)}
                      />
                      <div className="error-msg">
                        <ErrorMessage name="serverUrl" />
                      </div>
                    </div>

                    <div
                      className={classNames('form-group', 'position-relative')}
                    >
                      <label htmlFor="serverPort">Server Port</label>
                      <Input
                        formInput
                        name="serverPort"
                        disabled={loading}
                        required
                        value={values.serverPort}
                        onBlur={() => setServerPort(values.serverPort)}
                      />
                      <div className="error-msg">
                        <ErrorMessage name="serverPort" />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className={classNames('btn-theme', 'button')}
                  disabled={loading}
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
