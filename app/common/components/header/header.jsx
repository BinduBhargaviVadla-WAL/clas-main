import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { IoIosNotificationsOutline } from 'react-icons/io';
import {
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Col
} from 'reactstrap';
import CLLogo from '../../../assets/images/logo.svg';
import { logout, getCurrentUser } from '../../routines/user-operations';

const Header = () => {
  const user = getCurrentUser();

  return (
    <div className="header">
      <Navbar className="custom-container row" expand="lg">
        <Col lg={6} md={6} xs={6} className="custom-navbrand">
          <Link className="navbar-brand" to="#">
            <img src={CLLogo} alt="Cypress Lawn" className="cypress-logo" />
          </Link>
        </Col>
        <Col lg={6} md={6}>
          <ul className="Nav-ul-list mb-0">
            <li>
              <IoIosNotificationsOutline size={24} />
            </li>
            <li>Product tour</li>
            <li className="navbar-right-wrapper">
              <div className="user-section">
                <UncontrolledDropdown>
                  <DropdownToggle className="user-section-btn d-flex align-items-center justify-content-center">
                    <small className="user-image-wrapper">
                      <b className="d-flex align-items-center justify-content-center">
                        {_.get(user, 'name[0]', 'J')}
                      </b>
                    </small>
                    <span className="user-name">
                      {_.get(user, 'name', 'Jane Tran')}
                    </span>
                    <i className="fas fa-chevron-down ml-auto" />
                  </DropdownToggle>
                  <DropdownMenu className="user-section-dropdownlists" right>
                    <button
                      type="button"
                      className="user-section-dropdownlist user-logout"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </li>
          </ul>
        </Col>
      </Navbar>
    </div>
  );
};

export default Header;
