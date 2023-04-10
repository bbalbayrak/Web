import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
  const [closed, setClosed] = useState(false);

  const handleToggle = () => {
    setClosed(!closed);
  };

  return (
    <div className="menu-container">
      <button className="hamburger-button" onClick={handleToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`hamburger-menu ${closed ? 'closed' : ''}`}>
        <ul className="menu">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/vendors">
            Vendors
          </Link>
          <Link className="link" to="/customers">
            Customers
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/dashboard">
            Dashboard
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
