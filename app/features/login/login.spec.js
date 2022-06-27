/* eslint-disable no-undef */
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Field } from 'formik';

import Login from './login';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const component = shallow(<Login />);
  return {
    component,
    login: component.find('.login'),
    username: component.find(Field)
  };
}

describe('COMPONENT: Login', () => {
  it('should match exact snapshot', () => {
    const { component } = setup();

    const login = <Login />;
    const tree = renderer.create(login).toJSON();

    expect(tree).toMatchSnapshot();
    console.log(component.find('.form-control').at(0));
  });

  // it('should display validation error if username is empty', () => {
  //   const { login } = setup();
  //   expect(p.text()).toMatch(/^1$/);
  // });

  // it('should first button should call increment', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(0).simulate('click');
  //   expect(actions.increment.called).toBe(true);
  // });

  // it('should second button should call decrement', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(1).simulate('click');
  //   expect(actions.decrement.called).toBe(true);
  // });

  // it('should third button should call incrementIfOdd', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(2).simulate('click');
  //   expect(actions.incrementIfOdd.called).toBe(true);
  // });

  // it('should fourth button should call incrementAsync', () => {
  //   const { buttons, actions } = setup();
  //   buttons.at(3).simulate('click');
  //   expect(actions.incrementAsync.called).toBe(true);
  // });
});
