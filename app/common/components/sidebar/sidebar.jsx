/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = useSelector(state => {
    return state.support.navItems;
  });

  return (
    <div className="sidebar">
      <Nav vertical>
        {navItems.map(({ name, icon, link }, index) => {
          return (
            <NavItem key={index.toString()}>
              <NavLink
                activeClassName="nav-active"
                tag={RouterNavLink}
                to={`${link}`}
              >
                <i className={`fas ${icon}`} />
                {name}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
    </div>
  );
};

export default Sidebar;
